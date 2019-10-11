import React from 'react';
//
import { ROUTES } from 'constants';
import { LoginForm } from 'components/LoginForm';
import './login-page.scss';

export class LoginPage extends React.PureComponent {
  render() {
    return (
      <div className="login-page flex align-items-center justify-content-center">
        <div className="login-page__form-wrapper">
          <LoginForm redirectUrl={ROUTES.HOME_PAGE} />
        </div>
      </div>
    );
  }
}
