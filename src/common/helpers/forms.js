import { message } from 'antd';

let requestMaker = null;

/**
 * Set the dependency for network requests
 * @param instrument
 */
export function initRequestMaker(instrument) {
  requestMaker = instrument;
}

/**
 * Get the dependency for network requests
 */
export function getRequestMaker() {
  return requestMaker;
}

/**
 * Abstract handler for form's requests
 * @param props
 */
export function sendForm(props = {}) {
  const { event, form, url = '', method = 'post', toggleProcessing = Function.prototype, rewriteValues } = props;
  event.preventDefault();

  return new Promise(async (resolve, reject) => {
    const { error, values } = await formValidateAndGetValues(form);

    if (error) { return reject(error); }

    const requestMaker = getRequestMaker();
    let response;

    if (!requestMaker) {
      return reject(new Error('`requestMaker` is not exists'));
    }

    toggleProcessing(true);
    try {
      response = await requestMaker[method](url, typeof rewriteValues === 'function' ? rewriteValues(values) : values);
    } catch (error) {
      response = (error || {}).response
    }
    toggleProcessing(false);

    const responseStatus = getStatusCode(response);

    if (!response || responseStatus > 399) {
      handleFormBackendErrors(response, form, values);
      return reject();
    }

    resolve(response);
  });
}

/**
 * Get value and errors from the form
 * @param form
 * @returns {Promise<any>}
 */
export function formValidateAndGetValues(form) {
  return new Promise((resolve) => {
    form.validateFields((error, values) => {
      resolve({ error, values });
    });
  });
}

/**
 * Handle errors from backend side
 * @param response
 * @param form
 * @param values
 */
export function handleFormBackendErrors(response, form, values) {
  response = response ? response : { statusCode: 500 };

  const responseStatus = getStatusCode(response);
  const responseMessage = response.message || (response.data || {}).message;
  const setFieldsObject = {};
  const networkError = 'Network error! Please try again later.';
  const { errors = [] } = response || {};

  errors.forEach((error) => {
    if (!error.param) return;
    setFieldsObject[error.param] = {
      value: values[error.param],
      errors: [new Error(error.msg || 'Unknown error')]
    };
  });

  form.setFields(setFieldsObject);

  switch (responseStatus) {
    case 500:
      message.error('Internal server error.', 10);
      break;
    case undefined:
      message.error(networkError, 10);
      break;
    default:
      message.error(responseMessage || networkError, 10);
  }
}

/**
 * Get the status code from response
 * @param res
 * @returns {*}
 */
export function getStatusCode(res) {
  const DEFAULT_ERROR_STATUS = 500;
  if (!res) { return DEFAULT_ERROR_STATUS; }
  if (res.statusCode !== undefined) { return res.statusCode; }
  if (res.status !== undefined) { return res.status; }
  return DEFAULT_ERROR_STATUS;
}
