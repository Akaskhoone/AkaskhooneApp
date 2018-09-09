import rootReducer from '@reducers/index';
import { client, interceptors } from '@utils/client';
import Reactotron from 'reactotron-react-native';
import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistedReducer = persistReducer({ storage, key: 'root', whitelist: ['auth'] }, rootReducer);

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
