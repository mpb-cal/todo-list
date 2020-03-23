import React from 'react';
import { createStore, combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { items } from './actions';
//import sampleState from './sampleStateMPB.json';
import ActionItemManagerRedux from './action-item-manager-redux';

const STORAGE_KEY = 'action-item-manager-state';

function App() {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  const store = createStore(
    combineReducers({items}),
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || 
      {items:[]}
  );

  store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  });

  return (
    <ActionItemManagerRedux store={store} />
  );
}

export default App;
