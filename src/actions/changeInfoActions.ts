import { types } from '@constants/actionTypes';

export const changeInfoCompleted = (name: string, bio: string, image) => dispatch => {
  const formData: any = new FormData();
  formData.append('name', name);
  formData.append('bio', bio || '');
  if (image && image.new) {
    formData.append('image', { uri: image.uri, name: 'image.jpg', type: 'multipart/form-data' });
  }
  return dispatch({
    types: [types.CHANGEINFO, types.CHANGEINFO_SUCCESS, types.CHANGEINFO_FAIL],
    payload: {
      request: {
        url: '/accounts/profile/',
        method: 'put',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }
    }
  });
};
