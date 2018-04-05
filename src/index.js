// is the JavaScript entry point!
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import User from './User';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path='/:username' component={User} />
    </div>
  </Router>
  , document.getElementById('root')
);
