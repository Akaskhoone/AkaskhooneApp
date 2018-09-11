import { types } from '@constants/actionTypes';

export const createPost = (image, caption: string) => dispatch => {
  const formData: any = new FormData();
  formData.append('caption', caption);
  formData.append('image', { uri: image.uri, name: 'image.jpg', type: 'multipart/form-data' });

  return dispatch({
    types: [types.CREATEPOST, types.CREATEPOST_SUCCESS],
    payload: {
      request: {
        url: '/social/posts/',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }
    }
  });
};

export const setPostImage = imageUri => ({
  type: types.SET_POST_IMAGE,
  payload: { imageUri }
});
