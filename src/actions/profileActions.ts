import { auth } from '@constants/actionTypes';
export const loadOthersProfile = username => dispatch => {
  const usernameQuery = `?username=${username}`;
  const url = `accounts/profile/${usernameQuery}`;
  return dispatch({
    types: [auth.OTHERS_PROFILE, auth.OTHERS_PROFILE_LOAD_SUCCESS, auth.OTHERS_PROFILE_LOAD_FAILED],
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
  types: [auth.OWN_PROFILE, auth.OWN_PROFILE_LOAD_SUCCESS, auth.OWN_PROFILE_LOAD_FAILED],
  payload: {
    request: {
      url: 'accounts/profile/',
      method: 'get'
    }
  }
});
