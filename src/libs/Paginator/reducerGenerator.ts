import Reactotron from 'reactotron-react-native';
import types from './actionTypes';

/* action after returning from actionExtractor should be in the following format:
//    {
        type: string,
        payload: {
          data: 
        }
        pagination?: string
      }
*/
export default (name, actionExtractor = a => a) => {
  const initialState = {
    data: {},
    paginations: {}
  };
  const paginationInitialState = {
    data: [],
    loading: true,
    loadingMore: false,
    next: null,
    previous: null
  };
  const paginationsReducer = (draftState, action) => {
    if (action.pagination) {
      const data = action.payload.data;
      Reactotron.log('Pagination Action', action);
      switch (action.type) {
        case types.DATA_LOAD:
          return {
            ...draftState,
            [action.pagination]: paginationInitialState
          };
        case types.DATA_LOAD_SUCCESS:
          return {
            ...draftState,
            [action.pagination]: {
              data: data.posts.map(p => p.post_id),
              next: data.next,
              loading: false
            }
          };
        case types.DATA_LOAD_FAIL:
          return {
            ...draftState,
            [action.pagination]: {
              ...draftState[action.pagination],
              loading: false
            }
          };

        case types.DATA_LOAD_MORE:
          draftState[action.pagination].loadingMore = true;
          return {
            ...draftState,
            [action.pagination]: {
              ...draftState[action.pagination],
              loadingMore: true
            }
          };
        case types.DATA_LOAD_MORE_SUCCESS:
          return {
            ...draftState,
            [action.pagination]: {
              ...draftState[action.pagination],
              data: [...draftState[action.pagination].data, ...data.posts.map(p => p.post_id)],
              next: data.next,
              loadingMore: false
            }
          };
        case types.DATA_LOAD_MORE_FAIL:
          return {
            ...draftState,
            [action.pagination]: {
              ...draftState[action.pagination],
              loadingMore: false
            }
          };
      }
    }
    return draftState;
  };

  const dataReducer = (draftState, action) => {
    switch (action.type) {
      case types.DATA_LOAD_SUCCESS:
      case types.DATA_LOAD_MORE_SUCCESS:
        return {
          ...draftState,
          ...action.payload.data.posts.reduce(
            (posts, post) => ({ ...posts, [post.post_id]: post }),
            {}
          )
        };
      default:
        return draftState;
    }
  };

  return (state = initialState, action) => {
    if (action.dataType === name) {
      return {
        paginations: paginationsReducer(state.paginations, actionExtractor(action)),
        data: dataReducer(state.data, actionExtractor(action))
      };
    } else {
      return state;
    }
  };
};

export const selectors = {
  pagination: (state, paginationName) => ({
    getData: () => state.paginations[paginationName] && state.paginations[paginationName].data,
    getPreviousPageUrl: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].previous,
    hasPrevious: () =>
      !!state.paginations[paginationName] && !!state.paginations[paginationName].previous,
    getNextPageUrl: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].next,
    hasNext: () => !!state.paginations[paginationName] && !!state.paginations[paginationName].next,
    isLoadingMore: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].loadingMore,
    isLoading: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].loading,
    hasData: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].data.length > 0
  }),
  getData: (state, dataId) => state.data[dataId] || null
};
