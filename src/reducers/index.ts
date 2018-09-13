import { generateReducerFor, paginatorSelectors } from '@libs/Paginator';
import { applyNormalizeOnAction, generateSelector } from '@utils/helpers';
import { comment, post, profile } from '@utils/schemas';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import selectPictureReducer from './selectPicture';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  selectPicture: selectPictureReducer,
  posts: generateReducerFor('posts', action => applyNormalizeOnAction(action, [post])),
  profiles: generateReducerFor('profiles', action => applyNormalizeOnAction(action, [profile])),
  comments: generateReducerFor('comments', action => applyNormalizeOnAction(action, [comment]))
});

export const selectors = {
  isLoggedIn: state => !!state.auth.tokens.refresh,
  profileLoaded: state => !!state.auth.ownProfile.email && !!state.auth.ownProfile.username,
  posts: generateSelector(paginatorSelectors, state => state.posts),
  comments: generateSelector(paginatorSelectors, state => state.comments),
  profiles: generateSelector(paginatorSelectors, state => state.profiles)
} as {
  isLoggedIn: any;
  profileLoaded: any;
  posts: typeof paginatorSelectors;
  comments: typeof paginatorSelectors;
  profiles: typeof paginatorSelectors;
};
