import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router-dom';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order
import { withUser } from 'common/context/user/User.Consumer';
import RouterGuard from 'components/RouterGuard';
import { NotFoundPage } from 'pages/NotFoundPage';
import { LoginPage } from 'pages/LoginPage';
import { DashboardPage } from 'pages/DashboardPage';
import { ProfilePage } from 'pages/ProfilePage';

import 'antd/dist/antd.css';
import './styles/index.scss';

@withUser
export class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <RouterGuard path={ROUTES.LOGIN}
                     component={LoginPage}
                     onlyGuest />
        <RouterGuard path={ROUTES.HOME_PAGE}
                     component={DashboardPage}
                     exact
                     onlyAuth
                     redirectTo={ROUTES.LOGIN} />
        <RouterGuard path={ROUTES.PROFILE}
                     component={ProfilePage}
                     onlyAuth
                     redirectTo={ROUTES.LOGIN} />
        <RouterGuard component={NotFoundPage} />
      </Switch>
    );
  }
}

export default hot(module)(App);
