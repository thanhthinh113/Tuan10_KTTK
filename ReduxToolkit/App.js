// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainComponent from './MainComponents';

const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
