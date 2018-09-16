import deepmerge from 'deepmerge';
import Reactotron from 'reactotron-react-native';
import types from './actionTypes';

// This function is required for overwriting arrays in deepmerge
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

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
    meta: {},
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
  const paginationsReducer = (state, action) => {
    if (action.dataType === name && action.pagination) {
      Reactotron.log('Pagination Action', action, ' In ', name);
      switch (action.type) {
        case types.DATA_LOAD:
          return {
            ...state,
            [action.pagination]: {
              ...paginationInitialState,
              data:
                (state[action.pagination] && state[action.pagination].data) ||
                paginationInitialState.data
            }
          };
        case types.DATA_LOAD_SUCCESS:
          return {
            ...state,
            [action.pagination]: {
              ...state[action.pagination],
              data: action.payload.data.result,
              next: action.payload.data.next,
              loading: false
            }
          };
        case types.DATA_LOAD_FAIL:
          return {
            ...state,
            [action.pagination]: {
              ...state[action.pagination],
              loading: false
            }
          };

        case types.DATA_LOAD_MORE:
          return {
            ...state,
            [action.pagination]: {
              ...state[action.pagination],
              loadingMore: true
            }
          };
        case types.DATA_LOAD_MORE_SUCCESS:
          return {
            ...state,
            [action.pagination]: {
              ...state[action.pagination],
              data: [...state[action.pagination].data, ...action.payload.data.result],
              next: action.payload.data.next,
              loadingMore: false
            }
          };
        case types.DATA_LOAD_MORE_FAIL:
          return {
            ...state,
            [action.pagination]: {
              ...state[action.pagination],
              loadingMore: false
            }
          };
      }
    }
    return state;
  };

  const dataReducer = (state, action) => {
    switch (action.type) {
      case types.DATA_LOAD_SUCCESS:
      case types.DATA_LOAD_MORE_SUCCESS:
        Reactotron.log('Data Add Action', action, ' In ', name);
        return deepmerge(state, action.payload.data.entities[name] || {}, {
          arrayMerge: overwriteMerge
        });
      default:
        return state;
    }
  };

  const metaReducer = (state, action) => {
    if (action.dataType === name) {
      switch (action.type) {
        case types.SET_META:
          return {
            ...state,
            meta: {
              ...state.meta,
              ...action.payload.meta
            }
          };
      }
    }
    return state;
  };

  return (state = initialState, action) => {
    if (action.dataType) {
      return {
        meta: metaReducer(state.meta, actionExtractor(action)),
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
    getData: () =>
      (state.paginations[paginationName] && state.paginations[paginationName].data) || [],
    getPreviousPageUrl: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].previous,
    hasPrevious: () =>
      !!state.paginations[paginationName] && !!state.paginations[paginationName].previous,
    getNextPageUrl: () =>
      !!state.paginations[paginationName] && state.paginations[paginationName].next,
    hasNext: () => !!state.paginations[paginationName] && !!state.paginations[paginationName].next,
    isLoadingMore: () =>
      !!state.paginations[paginationName] && !!state.paginations[paginationName].loadingMore,
    isLoading: () =>
      !!state.paginations[paginationName] && !!state.paginations[paginationName].loading,
    hasData: () =>
      !!state.paginations[paginationName] && !!(state.paginations[paginationName].data.length > 0)
  }),
  getData: (state, dataId) => state.data[dataId] || {},
  dataLoaded: (state, dataId) => !!state.data[dataId],
  getMeta: (state, metaName) => state.meta[metaName]
};

export type Selector<T> = typeof selectors & {
  getData: (state: any, dataId: any) => T;
};
