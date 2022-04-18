import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from '@reduxjs/toolkit';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
