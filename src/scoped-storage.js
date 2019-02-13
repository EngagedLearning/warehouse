export const createScopedStorage = (storage, scope) => {
  const fullKey = key => `${scope}.${key}`;

  const write = (key, dataString) =>
    new Promise((resolve, reject) => {
      try {
        storage.setItem(fullKey(key), dataString);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const read = key =>
    new Promise((resolve, reject) => {
      try {
        const dataString = storage.getItem(fullKey(key));
        resolve(dataString);
      } catch (err) {
        reject(err);
      }
    });

  return {
    write,
    read,
  };
};
