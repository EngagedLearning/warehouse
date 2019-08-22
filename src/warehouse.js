import { canUseStorage } from "./can-use-storage";
import { createInMemoryStorage } from "./in-memory-storage";
import { createScopedStorage } from "./scoped-storage";
import { createDynamoStorage } from "./dynamo-storage";

const getOrCreateStorage = (table, scope, createDynamo) => {
  if (canUseStorage(window.localStorage)) {
    return createScopedStorage({
      storage: window.localStorage,
      scope: `${table}.${scope}`,
    });
  } else if (canUseStorage(window.sessionStorage)) {
    return createScopedStorage({
      storage: window.sessionStorage,
      scope: `${table}.${scope}`,
    });
  } else if (createDynamo) {
    return createDynamoStorage(createDynamo, table, scope);
  } else {
    return createInMemoryStorage(table, scope);
  }
};

export const createWarehouse = ({ table, scope, createDynamo }) => {
  const storage = getOrCreateStorage(table, scope, createDynamo);

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
