import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order

export class Sidebar extends React.PureComponent {
  static propTypes = {
    location: PT.object.isRequired
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <Menu
        selectedKeys={[pathname]}
        defaultOpenKeys={[`/${pathname.split('/')[1]}`]}
        mode="inline"
        style={{ width: 256 }}
        theme="dark"
        className="sidebar">
        <Menu.Item key={ROUTES.HOME_PAGE}>
          <Icon type="dashboard" theme="outlined" />
          Dashboard
          <Link to={ROUTES.HOME_PAGE} />
        </Menu.Item>
        <Menu.Item key={ROUTES.PROFILE}>
          <Icon type="dashboard" theme="outlined" />
          Profile
          <Link to={ROUTES.PROFILE} />
        </Menu.Item>
      </Menu>
    );
  }
}
