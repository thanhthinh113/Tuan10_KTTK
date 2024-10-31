// src/App.js
import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoApp from './screens/TodoApp';

const App = () => {
  return (
    <RecoilRoot>
      <TodoApp />
    </RecoilRoot>
  );
};

export default App;
