import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';

// const store = createStore(reducer);
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  },
});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
