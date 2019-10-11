import React from 'react';
import PT from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
//
import { ROUTES } from 'constants';
import { withProcessing } from 'common/HOC/withProcessing';
import { withUser } from 'common/context/user/User.Consumer';
import { sendForm } from 'common/helpers';
import { API_URL } from 'constants';
import { getProp } from 'common/helpers';
import './login-form.scss';

@withRouter
@withProcessing
@withUser
@Form.create({ name: 'loginForm' })
export class LoginForm extends React.PureComponent {
  static propTypes = {
    userContext: PT.object,
    toggleProcessing: PT.func,
    redirectUrl: PT.string,
    isProcessing: PT.bool
  };

  /**
   * Handle form result with success status
   * @param response
   */
  onSubmitFormWithSuccessEventHandler = (response) => {
    const { userContext, location: { search = '' } } = this.props;
    const data = getProp(response, 'data.data') || {};
    const { user = {}, accessToken } = data;
    const queryRedirectUrl = (parse(search, { ignoreQueryPrefix: true }) || {}).redirectUrl;
    const redirectUrl = queryRedirectUrl ? queryRedirectUrl : (this.props.redirectUrl || ROUTES.HOME_PAGE);

    userContext.updateAccessToken(accessToken);
    userContext.updateUser(user);
    this.props.history.push(redirectUrl);
  };

  /**
   * Handle form result with fail status
   */
  onSubmitFormWithFailEventHandler = () => {
    this.props.form.resetFields(['password']);
  };

  /**
   * Handle the form submit event
   * @param event
   */
  onSubmitHandler = (event) => {
    const { form, toggleProcessing } = this.props;

    sendForm({
      event, form,
      url: API_URL.USERS_LOGIN,
      toggleProcessing
    })
      .then(this.onSubmitFormWithSuccessEventHandler)
      .catch(this.onSubmitFormWithFailEventHandler);
  };

  render() {
    const { form, isProcessing } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form
        onSubmit={this.onSubmitHandler}
        className="login-form">
        <div className="form__title text-center mt-2 mb-4 color-gray bold">Please login to the system</div>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email', validateStatus: 'error' },
              { type: 'email', message: 'Invalid email address', validateStatus: 'validating' }
            ]
          })(
            <Input
              prefix={<Icon type="user" theme="outlined" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input password', validateStatus: 'error' }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" theme="outlined" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={isProcessing} type="primary" htmlType="submit" className="login-form__button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
