import React from 'react';
import PT from 'prop-types';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order
import { withUser } from 'common/context/user/User.Consumer';

@withRouter
@withUser
export class UserControls extends React.PureComponent {
  static propTypes = {
    userContext: PT.object,
    history: PT.object
  };

  logOutClick = () => {
    const { userContext, history } = this.props;
    userContext.logout();
    history.push(ROUTES.LOGIN);
  };

  renderMenu = (history) => (
    <Menu>
      <Menu.Item key="profile" onClick={() => history.push(ROUTES.PROFILE)}>
        <Icon type="user" theme="outlined" />
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={this.logOutClick}>
        <Icon type="logout" theme="outlined" />
        Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    const { history } = this.props;

    return (
      <Dropdown overlay={this.renderMenu(history)} trigger={['click']} placement="bottomLeft">
        <Avatar src={''} size={35} icon="user" />
      </Dropdown>
    );
  }
}
