import { types } from '@constants/actionTypes';
import { produce } from 'immer';

const initialState = {
  access: undefined,
  refresh: undefined
};

export default produce((draftState = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      draftState.access = action.payload.data.access;
      draftState.refresh = action.payload.data.refresh;
      return draftState;
    case types.REFRESH_TOKEN_SUCCESS:
      draftState.access = action.payload.data.access;
      return draftState;
    case types.LOGOUT:
      draftState.refresh = undefined;
      draftState.access = undefined;
      return draftState;
    default:
      return draftState;
  }
});
