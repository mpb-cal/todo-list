import React from 'react';
import { createStore, combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { items } from './actions';
import sampleState from './sampleStateMPB.json';
import ActionItemManagerRedux from './action-item-manager-redux';

const STORAGE_KEY_REDUX = 'action-item-manager-state-redux';

function App() {
  console.log(localStorage);

  const store = createStore(
    combineReducers({items}),
      JSON.parse(localStorage.getItem(STORAGE_KEY_REDUX)) || 
      sampleState
  );

  store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY_REDUX, JSON.stringify(store.getState()));
  });

  return (
    <ActionItemManagerRedux store={store} />
  );
}

export default App;
