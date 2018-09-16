import { types } from '@constants/actionTypes';

export const forgetPasswordSubmited = (email: string) => dispatch => {
  return dispatch({
    types: [types.FORGETPASSWORD, types.FORGETPASSWORD_SUCCESS, types.FORGETPASSWORD_FAIL],
    payload: {
      request: {
        url: '/accounts/resetpassword/',
        method: 'post',
        data: {
          email
        }
      }
    }
  });
};
