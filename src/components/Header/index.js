import React from 'react';
import { ROUTES } from '/constants';
import { Link } from 'react-router-dom';
import { UserControls } from './UserControls';
import './header.scss';

export class Header extends React.PureComponent {
  render() {
    return (
      <header className="header" id="header">
        <div className="header__content flex align-items-center justify-content-space-between">
          <Link to={ROUTES.HOME_PAGE} className="header__home">
            <div className="header__logo-wrapper">
              <img className="header__logo" src="/assets/images/logo.png" alt="Logo" />
            </div>
            Leasing Broker Software
          </Link>

          <div className="header__right-panel flex align-items-center">
            <UserControls />
          </div>
        </div>
      </header>
    );
  }
}
