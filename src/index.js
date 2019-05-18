import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './redux/Store';
import App from './App';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root'),
);
registerServiceWorker();
