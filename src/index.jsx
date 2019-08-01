import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import './index.css';
import App from './containers/App/App';
import rootSagas from './sagas';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSagas);
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



// const composeEnhancers = composeWithDevTools({
//    // options like actionSanitizer, stateSanitizer
//  });
// const store = createStore(reducer, composeEnhancers(
//    applyMiddleware(...middleware)
//  ));
