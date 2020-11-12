import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as History from 'history';
import { createStore } from './redux/store';
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { SetGame, SetPlayer, PlayerProfile, Home, PlayerGrade } from './pages';
import { Header } from './components';
import { Reset, SignIn, SignUp } from './pages/Auth';

const history = History.createBrowserHistory()
export const store= createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header/>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/" component={Home} />
        <Route exact path="/set" component={SetPlayer} />
        <Route exact path="/game" component={SetGame} />
        <Route exact path="/player/:id" component={PlayerProfile} />
        <Route exact path="/grade" component={PlayerGrade} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
