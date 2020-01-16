import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createStore } from 'redux';
import loginreducer from './reducers/authorisationreducer/index'
import dummyreducer from './reducers/dummyreducer/index'
import { combineReducers } from 'redux'
import { saveStateToLocalStorae } from '../src/store/persistandrestorestate'
import MainComponent from './components/maincomponent/index'


const store = createStore(combineReducers({ login: loginreducer })); // define the Redux store here, passing in your reducers

const MOUNT_NODE = document.getElementById('root');
store.subscribe(() => {
    saveStateToLocalStorae(store.getState());
});

render(
    <Provider store={store}>
        <BrowserRouter>
            <MainComponent />
        </BrowserRouter>
    </Provider>,
    MOUNT_NODE,
);