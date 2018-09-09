import { refreshToken } from '@actions/loginActions';
import axios from 'axios';
import env from '@utils/env';
import Reactotron from 'reactotron-react-native';

const apiUrl = env.API_URL;
export const client = axios.create({
  baseURL: apiUrl
});

const extractAuthorizationHeader = getState => {
  Reactotron.log('Token:', getState().auth.tokens.access);
  return getState().auth.tokens.access
    ? `Bearer ${getState().auth.tokens.access}`
    : undefined;
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
      error: ({ dispatch, getState }, res) => {
        if (
          res.response &&
          res.response.status === 401 &&
          res.response.data.error &&
          res.response.data.error.errorCode === 'TOKENEXP'
        ) {
          return dispatch(refreshToken()).then(() => {
            const authHeader = extractAuthorizationHeader(getState);
            res.config.headers.authorization = authHeader || '';
            return axios(res.config);
          });
        }
        return Promise.reject(res);
      }
    }
  ]
};
