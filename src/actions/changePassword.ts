import { auth } from '@constants/actionTypes';

export const changePassword = vals => ({
  type: [auth.CHANGE_PASSWORD, auth.CHANGE_PASSWORD_SUCCESS, auth.CHANGE_PASSWORD_FAIL],
  payload: {
    request: {
      url: '/accounts/profile/',
      method: 'PUT',
      data: {
        old_password: vals.oldPassword,
        new_password: vals.newPassword
      }
    }
  }
});
