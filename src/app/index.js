// console.log('Hello world');
import React from 'react';
import ReactDOM from 'react-dom';
// import Dashboard from './components/Dashboard';
import { store } from './store/index';
import Main from './components/Main';

ReactDOM.render(<Main />, document.getElementById('app'));
// console.log(store.getState());
