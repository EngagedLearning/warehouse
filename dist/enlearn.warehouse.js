'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createInMemoryStorage = function createInMemoryStorage() {
  var data = {};
  return {
    getItem: function getItem(key) {
      var value = data[key];
      return value === undefined ? null : value;
    },
    setItem: function setItem(key, value) {
      data[key] = value.toString();
    },
    removeItem: function removeItem(key) {
      delete data[key];
    },
    clear: function clear() {
      Object.keys(data).forEach(function (k) {
        delete data[k];
      });
    }
  };
};

var canUseStorage = function canUseStorage(storage) {
  if (!storage) {
    return false;
  }
  try {
    var testKey = "enlearn_warehouse_storage_support_test_key";
    storage.setItem(testKey, "");
    storage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
};

var createScopedStorage = function createScopedStorage(_ref) {
  var storage = _ref.storage,
      scope = _ref.scope;
  var fullKey = function fullKey(key) {
    return scope + "." + key;
  };
  return {
    getItem: function getItem(key) {
      return storage.getItem(fullKey(key));
    },
    setItem: function setItem(key, value) {
      return storage.setItem(fullKey(key), value);
    },
    removeItem: function removeItem(key) {
      return storage.removeItem(fullKey(key));
    },
    clear: function clear() {
      return storage.clear();
    }
  };
};

var getOrCreateStorage = function getOrCreateStorage() {
  if (canUseStorage(window.localStorage)) {
    return window.localStorage;
  } else if (canUseStorage(window.sessionStorage)) {
    return window.sessionStorage;
  } else {
    return new createInMemoryStorage();
  }
};
var createWarehouse = function createWarehouse(_ref) {
  var scope = _ref.scope;
  var storage = createScopedStorage({
    storage: getOrCreateStorage(),
    scope: scope
  });
  return {
    write: function write(key, value) {
      return new Promise(function (resolve, reject) {
        try {
          storage.setItem(key, value);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    read: function read(key) {
      return new Promise(function (resolve, reject) {
        try {
          resolve(storage.getItem(key));
        } catch (err) {
          reject(err);
        }
      });
    },
    remove: function remove(key) {
      return new Promise(function (resolve, reject) {
        try {
          storage.removeItem(key);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    clear: function clear() {
      return new Promise(function (resolve, reject) {
        try {
          storage.clear();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  };
};

exports.createInMemoryStorage = createInMemoryStorage;
exports.canUseStorage = canUseStorage;
exports.createScopedStorage = createScopedStorage;
exports.createWarehouse = createWarehouse;
