import { types } from '@constants/actionTypes';

export const load = () => ({
  types: [types.FEED_LOAD, types.FEED_LOAD_SUCCESS, types.FEED_LOAD_FAIL],
  payload: {
    request: {
      url: '/social/home/',
      method: 'GET'
    }
  }
});

export const loadMore = () => (dispatch, getState) => {
  const nextLink = getState().posts.feed.next;
  return dispatch({
    types: [types.FEED_LOADMORE, types.FEED_LOADMORE_SUCCESS, types.FEED_LOADMORE_FAIL],
    payload: {
      request: {
        url: nextLink,
        method: 'GET'
      }
    }
  });
};

// export const refresh = () => (dispatch, getState) => {
//   const previousLink = getState().posts.feed.previous;
//   return dispatch({
//     types: [auth.FEED_REFRESH, auth.FEED_REFRESH_SUCCESS, auth.FEED_REFRESH_FAIL],
//     payload: {
//       request: {
//         url: previousLink,
//         method: "GET"
//       }
//     }
//   });
// };
