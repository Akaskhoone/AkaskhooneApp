import { types } from '@constants/actionTypes';

export const createPost = (
  des: string,
  tags: string[],
  location: string,
  imageUri: string
) => dispatch => {
  const formData: any = new FormData();
  formData.append('des', des || '');
  formData.append('tags', (tags && tags.join(' ')) || '');
  formData.append('location', location || '');
  formData.append('image', { uri: imageUri, name: 'image.jpg', type: 'multipart/form-data' });
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
