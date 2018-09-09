import { auth } from '@constants/actionTypes';

export const createPost = (image, caption: string) => dispatch => {
  const formData: any = new FormData();
  formData.append('caption', caption);
  formData.append('image', { uri: image.uri, name: 'image.jpg', type: 'multipart/form-data' });

  return dispatch({
    types: [auth.CREATEPOST, auth.CREATEPOST_SUCCESS],
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
  type: auth.SET_POST_IMAGE,
  payload: { imageUri }
});
