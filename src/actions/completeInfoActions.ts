import { types } from '@constants/actionTypes';

export const completeInfoCompleted = (
  email: string,
  password: string,
  username: string,
  name: string,
  userInfo: string,
  image
) => dispatch => {
  const formData: any = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  formData.append('username', username);
  formData.append('bio', userInfo || '');
  if (image) {
    formData.append('image', { uri: image.uri, name: 'image.jpg', type: 'multipart/form-data' });
  }
  return dispatch({
    types: [types.COMPLETEINFO, types.COMPLETEINFO_SUCCESS, types.COMPLETEINFO_FAIL],
    payload: {
      request: {
        url: '/accounts/signup/',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }
    }
  });
};
