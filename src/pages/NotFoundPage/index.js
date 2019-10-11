import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
//
import { ROUTES } from 'constants'; // eslint-disable-line import/order

export const NotFoundPage = (props) => (
  <div className="flex flex-column align-items-center justify-content-center full-width">
    <div className="mt-10 semi-bold" style={{ fontSize: '130px' }}>
      404
    </div>
    <Typography.Title level={2} className="mt-1">
      Sorry, the page you visited does not exist.
    </Typography.Title>
    <Link to={ROUTES.HOME_PAGE} className="mt-5">
      <Button type="primary" onClick={() => props.history.push(ROUTES.HOME_PAGE)}>
        Back Home
      </Button>
    </Link>
  </div>
);
