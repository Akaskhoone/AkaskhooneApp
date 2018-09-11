import { types } from '@constants/actionTypes';
import { selectors } from '@reducers/index';

/*
// sample action: 
// payload: {
//    response: {
//      data: {
//        data: [...],
//        next: ...
//      }
//    }
// },
// pagination: string,
// dataType: string
*/

export default name => {
  return {
    createPagination: (paginationName, url) => {
      return {
        load: () => ({
          types: [types.DATA_LOAD, types.DATA_LOAD_SUCCESS, types.DATA_LOAD_FAIL],
          payload: {
            request: {
              url,
              method: 'get'
            }
          },
          pagination: paginationName,
          dataType: name
        }),
        loadMore: () => (dispatch, getState) => {
          const pagination = selectors[name].pagination(getState(), paginationName);
          const nextPageUrl = pagination.getNextPageUrl();
          return dispatch({
            types: [types.DATA_LOAD_MORE, types.DATA_LOAD_MORE_SUCCESS, types.DATA_LOAD_MORE_FAIL],
            payload: {
              request: {
                url: nextPageUrl,
                method: 'get'
              }
            },
            pagination: paginationName,
            dataType: name
          });
        }
      };
    },
    createEndpoint: url => ({
      loadItem: itemId => ({
        types: [types.DATA_LOAD, types.DATA_LOAD_SUCCESS, types.DATA_LOAD_FAIL],
        payload: {
          request: {
            url: `${url}${itemId}`,
            method: 'get'
          }
        },
        dataType: name
      }),
      createItem: itemData => ({
        types: [types.DATA_LOAD, types.DATA_LOAD_SUCCESS, types.DATA_LOAD_FAIL],
        payload: {
          request: {
            url: `${url}`,
            method: 'post',
            data: itemData
          }
        },
        dataType: name
      }),
      updateItem: (itemId, itemData) => ({
        types: [types.DATA_LOAD, types.DATA_LOAD_SUCCESS, types.DATA_LOAD_FAIL],
        payload: {
          request: {
            url: `${url}${itemId}`,
            method: 'put',
            data: itemData
          }
        },
        dataType: name
      }),
      deleteItem: itemId => ({
        types: [types.DATA_DELETE, types.DATA_DELETE_SUCCESS, types.DATA_DELETE_FAIL],
        payload: {
          request: {
            url: `${url}${itemId}`,
            method: 'delete'
          }
        },
        dataType: name
      })
    })
  };
};
