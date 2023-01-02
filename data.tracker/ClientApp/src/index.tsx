
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import AppRoutings from './components/appRoutings';
import constructStore from './store/store';
import AppRoot from './components/appRoot';

const rootElement = document.getElementById('root')
const history = createBrowserHistory();
const store = constructStore(history, {});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRoot/>
    </Router>
  </Provider>,
  rootElement
);
