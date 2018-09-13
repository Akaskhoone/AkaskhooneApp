import { types } from '@constants/actionTypes';
export const signupSubmited = (email: string, password: string) => ({
  types: [types.SIGNUP, types.SIGNUP_SUCCESS, types.SIGNUP_FAIL],
  payload: {
    request: {
      url: '/accounts/signup/',
      method: 'post',
      data: {
        email,
        password
      }
    }
  }
});
