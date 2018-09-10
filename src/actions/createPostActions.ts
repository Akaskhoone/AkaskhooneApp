import { auth } from '@constants/actionTypes';

export const createPost = (
  des: string,
  tags: string,
  location: string,
  imageUri: string
) => dispatch => {
  const formData: any = new FormData();
  formData.append('des', des || '');
  formData.append('tags', tags || '');
  formData.append('location', location || '');
  formData.append('image', { uri: imageUri, name: 'image.jpg', type: 'multipart/form-data' });
  return dispatch({
    types: [auth.CREATEPOST, auth.CREATEPOST_SUCCESS, auth.CREATEPOST_FAIL],
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
