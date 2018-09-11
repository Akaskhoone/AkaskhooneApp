import { types } from '@constants/actionTypes';
import { produce } from 'immer';
import { getReduxAxiosPreviousAction } from 'src/utils/helpers';

const initialState = {};
const commentInitialState = {
  loading: true,
  comments: [],
  next: undefined
};
export default produce((draftState, action) => {
  switch (action.type) {
    case types.COMMENTS_LOAD:
      draftState[action.payload.postId] = commentInitialState;
      return draftState;
    case types.COMMENTS_LOAD_SUCCESS:
      const previousAction = getReduxAxiosPreviousAction(action);
      draftState[previousAction.payload.postId].comments.push(action.payload.data.comments);
      draftState[previousAction.payload.postId].next = action.payload.data.next;
      draftState[previousAction.payload.postId].loading = false;
      return draftState;
    case types.COMMENTS_LOAD_FAIL:
      draftState[getReduxAxiosPreviousAction(action).payload.postId].loading = false;
      return draftState;
    case types.COMMENTS_RESET:
      draftState[action.payload.postId] = commentInitialState;
      return draftState;
    default:
      return initialState;
  }
});

export const selectors = {
  isFetchingComments: (state, postId) => !!state[postId] && state[postId].loading,
  getComments: (state, postId) =>
    (!!state[postId] && state[postId].comments) || [
      {
        comment_id: 21,
        text: 'چه ‍پست قشنگی',
        creator: { name: 'Eddie' },
        date: '2018-08-01 10:00:11.9381+00:00'
      },
      {
        comment_id: 33,
        text: 'دروغ میگه چرته',
        creator: { name: 'Mohammad' },
        date: '2017-08-01 03:00:11.9381+00:00'
      },
      {
        comment_id: 76,
        text: 'یه سر به پستای منم بزن',
        creator: { name: 'Farshad' },
        date: '2018-05-01 10:00:11.9381+00:00'
      }
    ],
  getCommentsNextPage: (state, postId) => !!state[postId] && state[postId].next,
  hasCommentsNextPage: (state, postId) => !!state[postId] && !!state[postId].next
};
