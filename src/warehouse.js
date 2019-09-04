import { canUseStorage } from "./can-use-storage";
import { createInMemoryStorage } from "./in-memory-storage";
import { createScopedStorage } from "./scoped-storage";
import { createDynamoStorage } from "./dynamo-storage";

const getOrCreateBrowserStorage = scope => {
  if (canUseStorage(window.localStorage)) {
    return createScopedStorage({
      storage: window.localStorage,
      scope: `${scope}`,
    });
  } else if (canUseStorage(window.sessionStorage)) {
    return createScopedStorage({
      storage: window.sessionStorage,
      scope: `${scope}`,
    });
  } else {
    return createInMemoryStorage(scope);
  }
};

const warehouse = storage => {
  return {
    write: (key, value) =>
      new Promise((resolve, reject) => {
        try {
          storage.setItem(key, value);
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
    read: key =>
      new Promise((resolve, reject) => {
        try {
          resolve(storage.getItem(key));
        } catch (err) {
          reject(err);
        }
      }),
    remove: key =>
      new Promise((resolve, reject) => {
        try {
          storage.removeItem(key);
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
  };
};

export const createDynamoWarehouse = ({ table, scope }) => {
  const storage = createDynamoStorage(table, scope);
  return warehouse(storage);
};

export const createWarehouse = ({ scope }) => {
  const storage = getOrCreateBrowserStorage(scope);
  return warehouse(storage);
};
