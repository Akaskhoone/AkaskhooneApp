import { types } from '@constants/actionTypes';
import { selectors } from 'src/reducers';

export const load = postId => (dispatch, getState) => {
  let url = selectors.getCommentsNextPage(getState(), postId);
  if (!url) url = `/social/posts/${postId}/comments`;
  return dispatch({
    types: [types.COMMENTS_LOAD, types.COMMENTS_LOAD_SUCCESS, types.COMMENTS_LOAD_FAIL],
    payload: {
      postId,
      request: {
        url,
        method: 'GET'
      }
    }
  });
};

export const reset = postId => ({
  type: [types.COMMENTS_RESET],
  payload: {
    postId
  }
});
