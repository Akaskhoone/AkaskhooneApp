import { getActionsFor } from 'src/libs/Paginator';

export const changeInfoSubmitted = (name: string, bio: string, image) => dispatch => {
  const formData: any = new FormData();
  formData.append('name', name);
  formData.append('bio', bio || '');
  if (image) {
    formData.append('image', { uri: image.uri, name: 'image.jpg', type: 'multipart/form-data' });
  }
  const profileEndpoint = getActionsFor('profiles').createEndpoint('/accounts/profile/');
  return dispatch(profileEndpoint.updateItem('', formData));
};
