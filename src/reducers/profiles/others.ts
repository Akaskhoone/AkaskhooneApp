import { types } from '@constants/actionTypes';
import env from '@utils/env.json';
import { produce } from 'immer';
import Reactotron from 'reactotron-react-native';
import { getReduxAxiosPreviousAction } from 'src/utils/helpers';

const initialState = {};
const profileInitialState = {
  loading: true,
  error: undefined,
  data: {
    bio: undefined,
    name: undefined,
    username: undefined,
    email: undefined,
    image: undefined,
    followers: 0,
    followings: 0
  },
  isFollowed: false
};

export default produce((draftState = initialState, action) => {
  switch (action.type) {
    case types.OTHERS_PROFILE:
      draftState[action.payload.username] = profileInitialState;
      return draftState;
    case types.OTHERS_PROFILE_LOAD_SUCCESS:
      const previousAction = getReduxAxiosPreviousAction(action);
      const successData = action.payload.data;
      const username = previousAction.payload.username;
      draftState[username].loading = false;
      draftState[username].isFollowed = action.payload.data.isFollowed;
      draftState[username].data.username = successData.username;
      draftState[username].data.image = successData.image
        ? `${env.ASSETS_URL}/${successData.image}`
        : undefined;
      draftState[username].data.email = successData.email;
      draftState[username].data.followers = successData.followers;
      draftState[username].data.followings = successData.followings;
      draftState[username].data.bio = successData.bio;
      draftState[username].data.name = successData.name;
      return draftState;
    case types.OTHERS_PROFILE_LOAD_FAILED:
      return draftState;
    default:
      return draftState;
  }
});

export const selectors = {
  isFetchingProfile: (state, username) => state[username] && state[username].loading,
  getProfile: (state, username) => (state[username] && state[username].data) || profileInitialState,
  isFollowed: (state, username) => state[username] && state[username].isFollowed
};
