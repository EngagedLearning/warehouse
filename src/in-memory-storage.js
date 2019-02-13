/*
 * An in-memory object that implements a subset of the Storage interface that we
 * can use in place of localStorage when localStorage is not available.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export const createInMemoryStorage = () => {
  const data = {};
  return {
    getItem: key => {
      return data.hasOwnProperty(key) ? data[key] : null;
    },
    setItem: (key, value) => {
      data[key] = value.toString();
    },
    removeItem: key => {
      delete data[key];
    },
    clear: () => {
      Object.keys(data).forEach(k => {
        delete data[k];
      });
    },
  };
};
