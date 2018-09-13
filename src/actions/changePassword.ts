import { types } from '@constants/actionTypes';

export const changePassword = vals => ({
  type: [types.CHANGE_PASSWORD, types.CHANGE_PASSWORD_SUCCESS, types.CHANGE_PASSWORD_FAIL],
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
