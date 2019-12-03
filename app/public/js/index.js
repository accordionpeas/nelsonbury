import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import getJSONFromScriptTag from './utils/get-json-from-script-tag';
import App from './App';
import createStore from './state/store';

import 'whatwg-fetch';
import '../styles/index.scss';

const store = createStore(getJSONFromScriptTag({ id: 'preloaded-state' }));

const renderApp = () => {
  const MOUNT_POINT = document.getElementById('app');

  hydrate(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    MOUNT_POINT,
  );
};

renderApp();
