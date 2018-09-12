import { auth } from '@constants/actionTypes';

export const forgetPasswordSubmited = (email: string) => dispatch => {
    return dispatch({
      types: [auth.FORGETPASSWORD, auth.FORGETPASSWORD_SUCCESS, auth.FORGETPASSWORD_FAIL],
      payload: {
        request: {
          url: '/accounts/resetpass/',
          method: 'post',
          data: {
            email
          }
        }
      }
    });
};
  