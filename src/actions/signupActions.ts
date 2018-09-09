import { auth } from '@constants/actionTypes';
export const signupSubmited = (email: string, password: string) => ({
  types: [auth.SIGNUP, auth.SIGNUP_SUCCESS, auth.SIGNUP_FAIL],
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
