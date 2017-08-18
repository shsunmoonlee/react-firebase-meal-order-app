import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// const repo = `/${window.location.pathname.split('/')[1]}`;

ReactDOM.render(
  <MuiThemeProvider>
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
