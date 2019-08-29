/*
 * An in-memory object that implements a subset of the Storage interface that we
 * can use in place of localStorage when localStorage is not available.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export const createInMemoryStorage = scope => {
  const fullKey = key => `${scope}.${key}`;
  const data = {};

  return {
    getItem: key => {
      const value = data[fullKey(key)];
      return value === undefined ? null : value;
    },
    setItem: (key, value) => {
      data[fullKey(key)] = value.toString();
    },
    removeItem: key => {
      delete data[fullKey(key)];
    },
  };
};
