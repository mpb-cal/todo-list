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
//      JSON.parse(localStorage.getItem(STORAGE_KEY_REDUX)) || 
//      sampleState
        {
          items: [
            {"description": "use separate columns for table and id", "done": false, id: 3},
            {"description": "eventually delete all history and comments columns", "done": false, id: 33},
            {"description": "AFI reports for Leif", "done": false, id: 44},
            {"description": "add field for ticket number, link to ticket page", "done": false, id: 45},
            {"description": "add field for reported issue - see XLS for drop down options, ability to add new option", "done": false, id: 47},
            {"description": "button to create UPS return label", "done": false, id: 23},
            {"description": "button to create UPS shipment", "done": false, id: 22},
          ]
        }
  );

  store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY_REDUX, JSON.stringify(store.getState()));
  });

  return (
    <ActionItemManagerRedux store={store} />
  );
}

export default App;
