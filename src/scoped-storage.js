export const createScopedStorage = ({ storage, scope }) => {
  const fullKey = key => `${scope}.${key}`;

  return {
    getItem: key => storage.getItem(fullKey(key)),
    setItem: (key, value) => storage.setItem(fullKey(key), value),
    removeItem: key => storage.removeItem(fullKey(key)),
    clear: () => storage.clear(),
  };
};
