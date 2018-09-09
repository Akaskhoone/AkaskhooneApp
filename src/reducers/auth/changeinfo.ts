import { auth } from '@constants/actionTypes';
import { produce } from 'immer';
export interface ChangeInfoState {
  loading: boolean;
  error: string;
  name: string;
  bio: string;
}

const initialState: ChangeInfoState = {
  loading: false,
  error: undefined,
  name: undefined,
  bio: undefined
};

export default produce((draftState: ChangeInfoState = initialState, action) => {
  switch (action.type) {
    case auth.CHANGEINFO:
      draftState.loading = true;
      draftState.error = undefined;
      return draftState;
    case auth.CHANGEINFO_SUCCESS:
      draftState.name = action.payload.request.name;
      draftState.bio = action.payload.request.bio;
      return draftState;
    case auth.CHANGEINFO_FAIL:
      draftState.loading = false;
      const error = action.error;
      draftState.error =
        (error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.errorCode) ||
        'unknown_error';
      return draftState;
    default:
      return draftState;
  }
});
