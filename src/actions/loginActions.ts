import { types } from '@constants/actionTypes';

export const loginUser = (email: string, password: string) => ({
  types: [types.LOGIN, types.LOGIN_SUCCESS, types.LOGIN_FAIL],
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
  type: types.LOGOUT
});
export const refreshToken = () => (dispatch, getState) => {
  return dispatch({
    types: [types.REFRESH_TOKEN, types.REFRESH_TOKEN_SUCCESS],
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
