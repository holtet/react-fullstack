import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard, Dashboard } from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectTaskDetail } from './TaskDetail';

const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route
            exact
            path="/dashboard"
            render={() => <ConnectedDashboard />}
          />
          <Route
            path="/task/:id"
            render={({ match }) => <ConnectTaskDetail match={match} />}
          />
        </div>
      </Provider>
    </Router>
  );
};

export default Main;
