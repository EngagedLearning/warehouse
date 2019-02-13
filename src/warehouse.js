import { canUseStorage } from "./can-use-storage";
import { createInMemoryStorage } from "./in-memory-storage";
import { createScopedStorage } from "./scoped-storage";

const getOrCreateStorage = () => {
  if (canUseStorage(window.localStorage)) {
    return window.localStorage;
  } else if (canUseStorage(window.sessionStorage)) {
    return window.sessionStorage;
  } else {
    return new createInMemoryStorage();
  }
};

export const createWarehouse = ({ scope }) => {
  const storage = createScopedStorage({
    storage: getOrCreateStorage(),
    scope,
  });

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
    clear: () =>
      new Promise((resolve, reject) => {
        try {
          storage.clear();
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
  };
};
