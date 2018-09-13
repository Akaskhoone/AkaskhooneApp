import { refreshToken } from '@actions/loginActions';
import env from '@utils/env.json';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';

const apiUrl = env.API_URL;
export const client = axios.create({
  baseURL: apiUrl
});

const extractAuthorizationHeader = getState => {
  const accessToken = getState().auth.accessToken;
  Reactotron.log('Token:', accessToken);
  return accessToken ? `Bearer ${accessToken}` : undefined;
};

export const interceptors = {
  request: [
    {
      success: ({ getState }, req) => {
        const authHeader = extractAuthorizationHeader(getState);
        if (authHeader) req.headers.authorization = authHeader;
        return req;
      }
    }
  ],
  response: [
    {
      success: (_, res) => {
        if (res.response && res.response.data === 'unexpected end of stream') {
          return axios(res.config);
        }
        return res;
      },
      error: ({ dispatch, getState }, res) => {
        if (
          res.response &&
          res.response.status === 401 &&
          res.response.data &&
          res.response.data.error &&
          res.response.data.error.token[0] === 'Invalid'
        ) {
          return dispatch(refreshToken()).then(() => {
            const authHeader = extractAuthorizationHeader(getState);
            res.config.headers.authorization = authHeader || '';
            return axios(res.config);
          });
        }
        if (res.response && res.response.data === 'unexpected end of stream') {
          return axios(res.config);
        }
        return Promise.reject(res);
      }
    }
  ]
};
