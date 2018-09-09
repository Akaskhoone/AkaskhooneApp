import { auth } from '@constants/actionTypes';
import { selectors } from 'src/reducers';

export const load = postId => (dispatch, getState) => {
  let url = selectors.getCommentsNextPage(getState(), postId);
  if (!url) url = `/social/posts/${postId}/comments`;
  return dispatch({
    types: [auth.COMMENTS_LOAD, auth.COMMENTS_LOAD_SUCCESS, auth.COMMENTS_LOAD_FAIL],
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
  type: [auth.COMMENTS_RESET],
  payload: {
    postId
  }
});
