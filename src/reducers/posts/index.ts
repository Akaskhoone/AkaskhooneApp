import { combineReducers } from 'redux';
import feedReducer from './feed';

export default combineReducers({
  feed: feedReducer
});

export const selectors = {
  hasFeedPosts: state => state.feed.posts.length !== 0,
  hasFeedNext: state => !!state.feed.next
};
