import { createInMemoryStorage } from "./in-memory-storage";

let storage;

beforeEach(() => {
  storage = createInMemoryStorage("");
});

test("can get and set strings", () => {
  storage.setItem("some key", "some value");
  expect(storage.getItem("some key")).toBe("some value");
});

test("stored items are always turned into strings", () => {
  storage.setItem("a", 123);
  expect(typeof storage.getItem("a")).toBe("string");
});

test("querying for non-existent key returns null", () => {
  expect(storage.getItem("random key")).toBe(null);
});

test("stored items can be removed", () => {
  storage.setItem("a", "1");
  storage.removeItem("a");
  expect(storage.getItem("a")).toBe(null);
});
