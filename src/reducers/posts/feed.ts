import { auth } from '@constants/actionTypes';
import { produce } from 'immer';

const initialState = {
  posts: [],
  next: '',
  previous: '',
  refreshing: false,
  loading: false,
  loadingMore: false
};

export default produce((draftState = initialState, action) => {
  switch (action.type) {
    case auth.FEED_LOAD:
      draftState.loading = true;
      return draftState;
    case auth.FEED_LOAD_SUCCESS:
      draftState.posts = action.payload.data.posts;
      draftState.next = action.payload.data.next;
      draftState.loading = false;
      return draftState;
    case auth.FEED_LOAD_FAIL:
      draftState.loading = false;
      return draftState;

    // case auth.FEED_REFRESH:
    //   draftState.refreshing = true;
    //   return draftState;
    // case auth.FEED_REFRESH_SUCCESS:
    //   draftState.posts.unshift(...action.payload.data);
    //   draftState.previous = action.payload.data.previous;
    //   draftState.refreshing = false;
    //   return draftState;
    // case auth.FEED_REFRESH_FAIL:
    //   draftState.refreshing = false;
    //   return draftState;

    case auth.FEED_LOADMORE:
      draftState.loadingMore = true;
      return draftState;
    case auth.FEED_LOADMORE_SUCCESS:
      draftState.posts.push(...action.payload.data.posts);
      draftState.next = action.payload.data.next;
      draftState.loadingMore = false;
      return draftState;
    case auth.FEED_LOADMORE_FAIL:
      draftState.loadingMore = false;
      return draftState;

    default:
      return draftState;
  }
});
