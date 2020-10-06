import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { urls } from "./utils/urlUtils.js";

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Route path={urls.home.path} component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
