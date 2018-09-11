import { generateSelector } from '@utils/helpers';
import Reactotron from 'reactotron-react-native';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerGenerator, { selectors as generalSelectors } from 'src/libs/reducerGenerator';
import authReducer from './auth';
import selectPictureReducer from './selectPicture';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  selectPicture: selectPictureReducer,
  posts: reducerGenerator('posts'),
  profiles: reducerGenerator('profiles'),
  comments: reducerGenerator('comments')
});

export const selectors = {
  isLoggedIn: state => !!state.auth.tokens.refresh,
  profileLoaded: state => !!state.auth.ownProfile.email && !!state.auth.ownProfile.username,
  posts: generateSelector(generalSelectors, state => state.posts),
  comments: generateSelector(generalSelectors, state => state.comments),
  profiles: generateSelector(generalSelectors, state => state.profiles)
} as {
  isLoggedIn: any;
  profileLoaded: any;
  posts: typeof generalSelectors;
  comments: typeof generalSelectors;
  profiles: typeof generalSelectors;
};
