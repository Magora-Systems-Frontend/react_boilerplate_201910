import React from 'react';
import PT from 'prop-types';
import { Breadcrumb, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order
import AuthorizedPageWrapper from 'components/AuthorizedPageWrapper';

export class ProfilePage extends React.PureComponent {
  static propTypes = {
    userContext: PT.object
  };

  render() {
    return (
      <AuthorizedPageWrapper>
        <div className="page__title mb-2">
          <Icon type="user" theme="outlined" />
          &nbsp; Profile
        </div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to={ROUTES.HOME_PAGE}>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>

        <div className="page__content-box mt-10 flex">
          <Avatar size={128} icon="user" />
          <div className="ml-5 flex flex-column justify-content-space-between">
            <div>
              <h3 className="bold">John Brown</h3>
            </div>
          </div>
        </div>
      </AuthorizedPageWrapper>
    );
  }
}
