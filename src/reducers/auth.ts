import { types } from '@constants/actionTypes';
import { decode } from 'base-64';
import { produce } from 'immer';

const initialState = {
  accessToken: undefined,
  refreshToken: undefined,
  username: undefined
};

const extractPayloadFromJWT = jwt => JSON.parse(jwt.split('.')[1]);
export default produce((draftState = initialState, action) => {
  let accessToken;
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      accessToken = action.payload.data.access;
      draftState.refreshToken = action.payload.data.refresh;
      draftState.accessToken = accessToken;
      // Extracting username from base64encoded access token
      // draftState.username = extractPayloadFromJWT(accessToken).username;
      draftState.username = 'reza';
      return draftState;
    case types.REFRESH_TOKEN_SUCCESS:
      accessToken = action.payload.data.access;
      draftState.accessToken = action.payload.data.access;
      // Extracting username from base64encoded access token
      // draftState.username = extractPayloadFromJWT(accessToken).username;
      draftState.username = 'reza';
      return draftState;
    case types.LOGOUT:
    default:
      return draftState;
  }
});

export const selectors = {
  isLoggedIn: state => !!state.refreshToken,
  getOwner: state => state.username,
  isOwner: (state, username) => state.username === username
};
