import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reducers from './reducers';

//import { AuthProvider } from '../context/authProvider';

const createStoreWithMiddleware = applyMiddleware()(
    compose(
        (window.devToolsExtension ? window.devToolsExtension() : (f) => f)(
            createStore
        )
    )
)

function main() {
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
        document.querySelector(".app-wrapper")
    );
}

document.addEventListener("DOMContentLoader",  main);