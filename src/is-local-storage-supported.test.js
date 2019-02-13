/* globals global */

import { isLocalStorageSupported } from "./is-local-storage-supported";

test("returns true if accessing localStorage does not throw", () => {
  global.window = {
    localStorage: {
      setItem: () => {},
      removeItem: () => {},
    },
  };

  expect(isLocalStorageSupported()).toBe(true);
});

test("returns false if localStorage.setItem throws", () => {
  global.window = {
    localStorage: {
      setItem: () => {
        throw new Error("nope");
      },
      removeItem: () => {},
    },
  };

  expect(isLocalStorageSupported()).toBe(false);
});

test("returns false if localStorage.removeItem throws", () => {
  global.window = {
    localStorage: {
      setItem: () => {},
      removeItem: () => {
        throw new Error("nope");
      },
    },
  };

  expect(isLocalStorageSupported()).toBe(false);
});

test("returns false if accessing window.localStorage fails", () => {
  global.window = {};
  Object.defineProperty(global.window, "localStorage", () => {
    throw new Error("nope");
  });

  expect(isLocalStorageSupported()).toBe(false);
});
