import { APP_PREFIX } from 'constants';

/**
 * Set the value into localStorage
 * @param key
 * @param state
 */
export function writeToLocalState(key, state) {
  try {
    localStorage.setItem(`${APP_PREFIX}_${key}`, JSON.stringify(state));
  } catch (e) {
    throw e;
  }
}

/**
 * Get the value from localStorage
 * @param key
 * @returns {*}
 */
export function getFromLocalState(key) {
  let state;

  try {
    state = JSON.parse(localStorage.getItem(`${APP_PREFIX}_${key}`));
  } catch (e) {
    throw e;
  }

  return state;
}

/**
 * Clear localStorage with the key
 * @param key
 */
export function clearLocalState(key) {
  try {
    localStorage.removeItem(`${APP_PREFIX}_${key}`);
  } catch (e) {
    throw e;
  }
}
