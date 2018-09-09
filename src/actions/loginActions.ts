import { auth } from '@constants/actionTypes';

export const loginUser = (email: string, password: string) => ({
  types: [auth.LOGIN, auth.LOGIN_SUCCESS, auth.LOGIN_FAIL],
  payload: {
    request: {
      url: '/accounts/login/',
      method: 'post',
      data: {
        email,
        password
      }
    }
  }
});

export const logout = () => ({
  type: auth.LOGOUT
});
export const refreshToken = () => (dispatch, getState) => {
  return dispatch({
    types: [auth.REFRESH_TOKEN, auth.REFRESH_TOKEN_SUCCESS],
    payload: {
      request: {
        url: 'accounts/refresh/',
        method: 'post',
        data: {
          refresh: getState().auth.tokens.refresh
        }
      }
    }
  });
};
