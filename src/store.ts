import appReducer from '@reducers/index';
import { client, interceptors } from '@utils/client';
import Reactotron from 'reactotron-react-native';
import { applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { types } from 'src/constants/actionTypes';
import axiosMiddleware from './libs/reduxAxiosMiddleware';

const rootReducer = (state, action) => {
  if (action.type === types.RESET_APP) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(
  { storage, key: 'root', whitelist: ['auth', 'posts', 'comments', 'profiles', 'tags', 'boards'] },
  rootReducer
);

export const store = (Reactotron as any).createStore(
  persistedReducer,
  applyMiddleware(
    axiosMiddleware(client, {
      interceptors,
      returnRejectedPromiseOnError: true
    }),
    thunk
  )
);

export const persistor = persistStore(store);
