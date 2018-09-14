import { generateReducerFor, paginatorSelectors, SelectorInterface } from '@libs/Paginator';
import { applyNormalizeOnAction, generateSelector } from '@utils/helpers';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { BoardDTO, CommentDTO, PostDTO, ProfileDTO, TagDTO } from 'src/utils/interfaces';
import authReducer, { selectors as authSelectors } from './auth';
import selectPictureReducer from './selectPicture';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  selectPicture: selectPictureReducer,
  posts: generateReducerFor('posts', action => applyNormalizeOnAction(action)),
  profiles: generateReducerFor('profiles', action => applyNormalizeOnAction(action)),
  comments: generateReducerFor('comments', action => applyNormalizeOnAction(action)),
  tags: generateReducerFor('tags', action => applyNormalizeOnAction(action)),
  boards: generateReducerFor('boards', action => applyNormalizeOnAction(action))
});

export const selectors = {
  ...generateSelector(authSelectors, state => state.auth),
  posts: generateSelector(paginatorSelectors, state => state.posts),
  comments: generateSelector(paginatorSelectors, state => state.comments),
  profiles: generateSelector(paginatorSelectors, state => state.profiles),
  tags: generateSelector(paginatorSelectors, state => state.tags),
  boards: generateSelector(paginatorSelectors, state => state.boards)
} as {
  isLoggedIn: any;
  getOwner: any;
  isOwner: any;
  posts: SelectorInterface<PostDTO>;
  comments: SelectorInterface<CommentDTO>;
  profiles: SelectorInterface<ProfileDTO>;
  tags: SelectorInterface<TagDTO>;
  boards: SelectorInterface<BoardDTO>;
};
