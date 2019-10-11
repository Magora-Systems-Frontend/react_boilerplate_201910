export * from './forms';

/**
 * Implementation of lodash.get function.
 * https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
 * @param {object|array} object - source object
 * @param {string} keys - path (example: test.one.two)
 * @param {*} defaultVal - default value (default: undefined)
 * @returns {*} - ended value
 */
export function getProp(object = {}, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
}

/**
 * Generate random string
 * @param {number} length - required length of string (default 5)
 * @returns {string} - random string
 */
export const getRandomString = (length = 5) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';

  for (let i = 0; i < length; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return str;
};
