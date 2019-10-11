import React from 'react';
import { Icon } from 'antd';
//
import AuthorizedPageWrapper from 'components/AuthorizedPageWrapper';

export class DashboardPage extends React.PureComponent {
  render() {
    return (
      <AuthorizedPageWrapper>
        <div className="page__title mb-2">
          <Icon type="dashboard" theme="outlined" />
          &nbsp; Dashboard
        </div>
      </AuthorizedPageWrapper>
    );
  }
}
