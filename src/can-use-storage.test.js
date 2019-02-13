import { canUseStorage } from "./can-use-storage";

test("returns true if accessing storage does not throw", () => {
  const storage = {
    setItem: () => {},
    removeItem: () => {},
  };
  expect(canUseStorage(storage)).toBe(true);
});

test("returns false if storage.setItem throws", () => {
  const storage = {
    setItem: () => {
      throw new Error("nope");
    },
    removeItem: () => {},
  };

  expect(canUseStorage(storage)).toBe(false);
});

test("returns false if storage.removeItem throws", () => {
  const storage = {
    setItem: () => {},
    removeItem: () => {
      throw new Error("nope");
    },
  };

  expect(canUseStorage(storage)).toBe(false);
});

test("returns false if storage is undefined or null", () => {
  expect(canUseStorage(undefined)).toBe(false);
  expect(canUseStorage(null)).toBe(false);
});
