import AppScreen from '@screens/index';
import { Root, Spinner, StyleProvider } from 'native-base';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/store';
import getTheme from './theme/components';
import commonColor from './theme/variables/commonColor';

// console.disableYellowBox = ['Warning: isMounted'];

export default class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <Root>
              <AppScreen />
            </Root>
          </PersistGate>
        </StyleProvider>
      </Provider>
    );
  }
}
