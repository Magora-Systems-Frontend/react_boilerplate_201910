import 'core-js/shim';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//
import { API_DOMAIN, API_VERSION } from 'constants'; // eslint-disable-line import/order
import * as axiosClient from 'common/api/axiosClient';
import { getRandomString } from 'common/helpers';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { UserProvider } from 'common/context/user/User.Provider';
import { initRequestMaker } from 'common/helpers';
import App from './app';

export const MOUNT_NODE = (() => {
  const element = document.createElement('div');
  element.id = `root_${getRandomString(12)}`;
  element.classList = ['root'];
  document.body.appendChild(element);
  return element;
})();

export const appBoot = (() => {
  axiosClient.init({ API_DOMAIN, API_VERSION });
  initRequestMaker(axiosClient.getAxios());
});

export const rootContainer = (
  <UserProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </UserProvider>
);

appBoot();
ReactDOM.render(rootContainer, MOUNT_NODE);
