import React, { Fragment } from 'react';
import PT from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order
import { getProp } from 'common/helpers';
import { withUser } from 'common/context/user/User.Consumer';

const RouterGuard = ({ component: Component, wrapper, userContext, onlyAuth, onlyGuest, redirectTo, ...rest }) => {
  const Wrapper = wrapper || Fragment;
  const userID = getProp(userContext, 'user.id');
  const isAuth = !!userID;
  const redirectUrl = getProp(rest, 'location.pathname');
  const redirectToUrl = redirectUrl ? `${redirectTo}?redirectUrl=${redirectUrl}` : redirectTo;
  const getContent = ({ isAuth, onlyAuth, redirectTo, ...rest } = {}) => {
    if (onlyAuth && !isAuth && redirectToUrl) { // Only authorized
      return (<Redirect to={redirectToUrl} />);
    }
    if (onlyGuest && isAuth && redirectTo) { // Only guest
      return (<Redirect to={redirectTo} />);
    }
    return (<Wrapper><Component {...rest} /></Wrapper>);
  };

  return (
    <Route
      {...rest}
      render={(props) => getContent({ ...props, isAuth, onlyGuest, onlyAuth, redirectTo })}
    />
  );
};

RouterGuard.propTypes = {
  component: PT.elementType.isRequired,
  userContext: PT.object.isRequired
};

export default withUser(RouterGuard);
