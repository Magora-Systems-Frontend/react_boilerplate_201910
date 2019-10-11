import axios from 'axios';
import { getProp } from 'common/helpers';

let axiosClient = null;

class AxiosClient {
  _ACCESS_TOKEN;
  _API_DOMAIN;
  _API_VERSION = 1;

  /**
   * Constructor
   * @param {object} props - list of properties (_ACCESS_TOKEN, _API_DOMAIN, _API_VERSION and etc)
   */
  constructor(props = {}) {
    Object.keys(props).forEach((propName) => this.setProperty(propName, props[propName]));

    const baseURL = `${this._API_DOMAIN}/api/v${this._API_VERSION}`;
    const localAxios = axios.create({
      baseURL,
      timeout: 25000
    });

    this._client = localAxios;
    this.useInterceptors();
  }

  /**
   * Set request / response interceptors
   */
  useInterceptors = () => {
    this._client.interceptors.request.use((config) => {
      const accessToken = (config.headers.Authorization || this._ACCESS_TOKEN);
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken.replace('Bearer', '')}`;
      }
      return {
        ...config,
        headers
      };
    });

    this._client.interceptors.response.use(
      (response) => {
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  /**
   * Set private property
   * @param {string} propName - property key
   * @param {any} propValue - property value
   * @returns {void}
   */
  setProperty(propName, propValue) {
    this[`_${propName}`.toUpperCase()] = propValue;
  }

  /**
   * Get instance
   * @returns {AxiosInstance} - AxiosInstance
   */
  getAxios() {
    return this._client;
  }
}

/*
 * Initialization
 * @param {object} props - some properties
 */
function init(props) {
  axiosClient = new AxiosClient(props);
}

/*
 * Return instance of Axios
 * @returns {object}
 */
function getAxios() {
  return axiosClient.getAxios();
}

/**
 * Change axios props
 * @param propName
 * @param propValue
 */
function setAxiosProperty(propName, propValue) {
  return axiosClient.setProperty(propName, propValue);
}

export { init, getAxios, setAxiosProperty };
