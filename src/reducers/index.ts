import { generateSelector } from '@utils/helpers';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import commentsReducer, { selectors as commentsSelectors } from './comments';
import postsReducer, { selectors as postsSelectors } from './posts';
import profilesReducer, { selectors as profilesSelectors } from './profiles';
import selectPictureReducer from './selectPicture';

function mainReducer(state = {}, action) {
  return state;
}

export default combineReducers({
  main: mainReducer,
  form: formReducer,
  auth: authReducer,
  selectPicture: selectPictureReducer,
  posts: postsReducer,
  profiles: profilesReducer,
  comments: commentsReducer
});

export const selectors = {
  isLoggedIn: state => !!state.auth.tokens.refresh,
  profileLoaded: state => !!state.profiles.own.email && !!state.profiles.own.username,
  ...generateSelector(postsSelectors, state => state.posts),
  ...generateSelector(commentsSelectors, state => state.comments),
  ...generateSelector(profilesSelectors, state => state.profiles)
} as any;
