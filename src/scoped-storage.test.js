import { createScopedStorage } from "./scoped-storage";

let mockedStorage;
let scopedStorage;

beforeEach(() => {
  mockedStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  scopedStorage = createScopedStorage({
    storage: mockedStorage,
    scope: "test-scope",
  });
});

test("scope is added as prefix to key when setting values", () => {
  scopedStorage.setItem("key", "value");
  expect(mockedStorage.setItem).toHaveBeenCalledWith("test-scope.key", "value");
});

test("scope is added as prefix to key when getting values", () => {
  scopedStorage.getItem("key");
  expect(mockedStorage.getItem).toHaveBeenCalledWith("test-scope.key");
});

test("scope is added as prefix to key when removing values", () => {
  scopedStorage.removeItem("key");
  expect(mockedStorage.removeItem).toHaveBeenCalledWith("test-scope.key");
});
