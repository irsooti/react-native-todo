/** @format */

if (__DEV__) {
  require('react-devtools');
}

import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import configureStore from './src/store/configureStore';

import { name as appName } from './app.json';

const store = configureStore();

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithRedux);
