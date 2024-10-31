// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import DataView from './components/DataView';

const App = () => {
  return (
    <Provider store={store}>
      <DataView />
    </Provider>
  );
};

export default App;
