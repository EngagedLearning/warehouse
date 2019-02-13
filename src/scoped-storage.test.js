import { createScopedStorage } from "./scoped-storage";
import { createInMemoryStorage } from "./in-memory-storage";

let backingStorage;
let scopedStorage;

beforeEach(() => {
  backingStorage = createInMemoryStorage();
  scopedStorage = createScopedStorage(backingStorage, "test-scope");
});

test("write prepends scope when saving to backing storage", async () => {
  await scopedStorage.write("key", "value");

  expect(backingStorage.getItem("key")).toBe(null);
  expect(backingStorage.getItem("test-scope.key")).toBe("value");
});

test("read prepends scope when reading from backing storage", async () => {
  backingStorage.setItem("key", "bad");
  backingStorage.setItem("test-scope.key", "good");

  const value = await scopedStorage.read("key");
  expect(value).toBe("good");
});

test("write rejects if backing storage throws", () => {
  const error = new Error("uh oh");
  backingStorage.setItem = () => {
    throw error;
  };
  return expect(scopedStorage.write("key", "value")).rejects.toBe(error);
});

test("read rejects if backing storage throws", () => {
  const error = new Error("uh oh");
  backingStorage.getItem = () => {
    throw error;
  };
  return expect(scopedStorage.read("key")).rejects.toBe(error);
});
