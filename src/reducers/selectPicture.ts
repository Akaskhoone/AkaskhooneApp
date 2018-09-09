import { auth } from '@constants/actionTypes';
import { produce } from 'immer';

export interface CreatePostState {
  imageUri: string;
  selected: boolean;
}

const initialState: CreatePostState = {
  imageUri: undefined,
  selected: false
};

export default produce((draftSatete: CreatePostState = initialState, action) => {
  switch (action.type) {
    case auth.CREATEPOST_SUCCESS:
      return initialState;
    case auth.SET_POST_IMAGE:
      draftSatete.imageUri = action.payload.imageUri;
      draftSatete.selected = true;
      return draftSatete;
    default:
      return draftSatete;
  }
});
