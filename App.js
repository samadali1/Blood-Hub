import React from 'react';
import Navigator from "./src/navigation/navigator";
import store from './src/store/index';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
      </Provider>
    
  );
}
