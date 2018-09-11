import { types } from '@constants/actionTypes';
import env from '@utils/env.json';
import { produce } from 'immer';
import Reactotron from 'reactotron-react-native';

const profileInitialState = {
  name: undefined,
  bio: undefined,
  username: undefined,
  image: undefined,
  email: undefined,
  followers: 0,
  followings: 0,
  loading: false
};

export default produce((draftState = profileInitialState, action) => {
  switch (action.type) {
    case types.OWN_PROFILE:
      draftState.loading = true;
      return draftState;
    case types.OWN_PROFILE_LOAD_SUCCESS:
      const successData = action.payload.data;
      draftState.loading = false;
      draftState.name = successData.username;
      draftState.bio = successData.bio;
      draftState.username = successData.username;
      draftState.image = successData.image ? `${env.ASSETS_URL}/${successData.image}` : undefined;
      draftState.email = successData.email;
      draftState.followers = successData.followers;
      draftState.followings = successData.followings;
      draftState.name = successData.name;
      return draftState;
    case types.CHANGEINFO_SUCCESS:
      Reactotron.log('Change info Res:', action);
      const changeInfoData = action.payload.data;
      draftState.loading = false;
      draftState.username = changeInfoData.username;
      draftState.image = changeInfoData.image
        ? `${env.ASSETS_URL}/${changeInfoData.image}`
        : undefined;
      draftState.email = changeInfoData.email;
      draftState.followers = changeInfoData.followers;
      draftState.followings = changeInfoData.followings;
      draftState.bio = changeInfoData.bio;
      draftState.name = changeInfoData.name;
      return draftState;
    case types.LOGOUT:
      return profileInitialState;
    default:
      return draftState;
  }
});
