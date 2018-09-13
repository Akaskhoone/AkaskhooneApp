import { types } from '@constants/actionTypes';
export const loadOthersProfile = username => dispatch => {
  const usernameQuery = `?username=${username}`;
  const url = `accounts/profile/${usernameQuery}`;
  return dispatch({
    types: [
      types.OTHERS_PROFILE,
      types.OTHERS_PROFILE_LOAD_SUCCESS,
      types.OTHERS_PROFILE_LOAD_FAILED
    ],
    payload: {
      username,
      request: {
        url,
        method: 'get'
      }
    }
  });
};

export const loadOwnProfile = () => ({
  types: [types.OWN_PROFILE, types.OWN_PROFILE_LOAD_SUCCESS, types.OWN_PROFILE_LOAD_FAILED],
  payload: {
    request: {
      url: 'accounts/profile/',
      method: 'get'
    }
  }
});
