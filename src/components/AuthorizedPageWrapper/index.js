import React from 'react';
import PT from 'prop-types';
//
import { withRouter } from 'react-router-dom';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Footer } from 'components/Footer';
import './auth-pages.scss';

@withRouter
export class AuthorizedPageWrapper extends React.PureComponent {
  render() {
    const { location, children } = this.props;

    return (
      <div className="auth-pages">
        <Header />
        <div className="auth-pages__wrapper flex">
          <Sidebar location={location} />
          <div className="auth-pages__right">
            <main className="auth-pages__content">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

AuthorizedPageWrapper.propTypes = {
  children: PT.oneOfType([PT.element, PT.array]),
  location: PT.object
};

export default AuthorizedPageWrapper
