const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const server = jsonServer.create();
const db = require('./db');
const router = jsonServer.router(db);
const users = require('./users');

const SECRET_KEY = '!Jd2lk3R#Lrj123';
const refreshExpiresIn = '1h';
const accessExpiresIn = '15s';

function createRefreshToken(payload) {
  return jwt.sign({ ...payload, type: 'R' }, SECRET_KEY, { expiresIn: refreshExpiresIn });
}

function createAccessToken(refresh_token) {
  const refreshTokenData = verifyRefreshToken(refresh_token);
  return jwt.sign({ email: refreshTokenData.email, type: 'A' }, SECRET_KEY, {
    expiresIn: accessExpiresIn
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined && decode.type === 'R') {
      return decode;
    } else {
      throw err;
    }
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined && decode.type === 'A') {
      return decode;
    } else {
      throw err;
    }
  });
}

function isAuthenticated({ email, password }) {
  return users.findIndex(user => user.email === email && user.password === password) !== -1;
}

function loginHandler(req, res) {
  const { email, password } = req.body;
  if (email === '400@test.com' && password === 'test')
    return res.status(400).json({
      error: {
        email: ['Exist', 'NotValid'],
        password: ['Common']
      }
    });
  console.log(req.body);
  if (isAuthenticated({ email, password }) === false) {
    return res.status(401).json({
      error: {
        errorCode: 'WrongCredentials'
      }
    });
  }
  const refresh_token = createRefreshToken({ email });
  const access_token = createAccessToken(refresh_token);
  res.status(200).json({ refresh: refresh_token, access: access_token });
}

function refreshHandler(req, res) {
  const { refresh } = req.body;
  console.log(req.body);
  const accessToken = createAccessToken(refresh);
  console.log('Access token', accessToken);
  return res.status(200).json({
    access: accessToken
  });
}

function authHandler(req, res, next) {
  console.log('Auth');
  console.log(req.headers);
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    return res.status(401).json({ error: { errorCode: 'NOTOKEN' } });
  }
  try {
    verifyAccessToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    return res.status(401).json({ error: { errorCode: 'TOKENEXP' } });
  }
}

function profileHandler(req, res, next) {
  let user = users[0];
  return res.status(200).json({
    name: user.name,
    image: user.image,
    bio: user.bio,
    followers: user.followers,
    followings: user.followings
  });
}

function signupHandler(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  return res.status(200);
}

server.use(jsonServer.defaults());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/api/v0/accounts/login/', loginHandler);
server.use('/api/v0/accounts/refresh/', refreshHandler);
server.post('/api/v0/accounts/signup/', upload.single('image'), signupHandler);
server.use(authHandler);
server.use('/api/v0/accounts/profile/', profileHandler);
server.use('/api/v0', router);
server.listen(3000, () => {
  console.log('Json server is running');
});
