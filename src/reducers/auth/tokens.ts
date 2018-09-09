import { auth } from '@constants/actionTypes';
import { produce } from 'immer';

const initialState = {
  access: undefined,
  refresh: undefined
};

export default produce((draftState = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      draftState.access = action.payload.data.access;
      draftState.refresh = action.payload.data.refresh;
      return draftState;
    case auth.REFRESH_TOKEN_SUCCESS:
      draftState.access = action.payload.data.access;
      return draftState;
    case auth.LOGOUT:
      draftState.refresh = undefined;
      draftState.access = undefined;
      return draftState;
    default:
      return draftState;
  }
});
