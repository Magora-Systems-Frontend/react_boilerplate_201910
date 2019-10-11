import React from 'react';
//
import { UserContext } from './User.Provider';

export const withUser = (Component) => (props) => (
  <UserContext.Consumer>
    {context => (<Component {...props} userContext={context} />)}
  </UserContext.Consumer>
);
