import React from 'react';
import './footer.scss';

export class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="footer flex align-items-center justify-content-space-between">
        <div className="footer__copyright semi-bold">
          Copyright © 2019 Concept. All rights reserved. Dashboard by&nbsp;
          <a href="https://magora-systems.com/" target="_blank" rel="noopener noreferrer">
            Magora
          </a>
          .
        </div>
      </footer>
    );
  }
}
