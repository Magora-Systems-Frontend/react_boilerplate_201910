import React from 'react';
import PT from 'prop-types';
//
import { LOCAL_STORAGE_KEYS } from 'constants'; // eslint-disable-line import/order
import { getFromLocalState, writeToLocalState, clearLocalState, } from 'common/localStorage';
import { setAxiosProperty } from 'common/api/axiosClient';

export const UserContext = React.createContext(null);

export class UserProvider extends React.PureComponent {
  static propTypes = {
    children: PT.node
  };
  static initialUser = undefined;
  static initialAccessToken = undefined;

  state = {
    user: getFromLocalState(LOCAL_STORAGE_KEYS.USER),
    accessToken: getFromLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
  };

  componentDidMount() {
    const accessToken = getFromLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const user = getFromLocalState(LOCAL_STORAGE_KEYS.USER);
    if (accessToken) { this.restoreAccessToken(accessToken); }
    if (user) { this.restoreUser(user); }
  }

  /**
   * Restore the user accessToken from a storage
   * @param accessToken
   */
  restoreAccessToken = (accessToken) => {
    this.setState({ accessToken });
    setAxiosProperty('access_token', accessToken);
  };

  /**
   * Restore the user data from a storage
   * @param user
   */
  restoreUser = (user) => {
    this.setState({ user });
  };

  /**
   * Update the user data
   * @param data
   */
  updateUser = (data) => {
    const { user } = this.state;
    const updatedUser = { ...user, ...data };
    writeToLocalState(LOCAL_STORAGE_KEYS.USER, updatedUser);
    this.setState({ user: updatedUser });
  };

  /**
   * Update the user accessToken
   * @param accessToken
   */
  updateAccessToken = (accessToken) => {
    writeToLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.setState({accessToken});
    setAxiosProperty('access_token', accessToken);
  };

  /**
   * Force logout and context refreshing for the user
   */
  logout = () => {
    this.setState({
      accessToken: UserProvider.initialAccessToken,
      user: UserProvider.initialUser,
    });
    setAxiosProperty('access_token', UserProvider.initialAccessToken);
    clearLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    clearLocalState(LOCAL_STORAGE_KEYS.USER);
  };

  render() {
    const { user, accessToken } = this.state;

    return (
      <UserContext.Provider value={{
        user,
        accessToken,
        updateUser: this.updateUser,
        updateAccessToken: this.updateAccessToken,
        logout: this.logout
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
