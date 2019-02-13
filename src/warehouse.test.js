import { createWarehouse } from "./warehouse";

let mockStorage;
let warehouse;

beforeEach(() => {
  mockStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  global.window = {
    localStorage: mockStorage,
  };

  warehouse = createWarehouse({ scope: "test-scope" });
});

test("write proxies to storage and resolves to undefined", async () => {
  await expect(warehouse.write("key", "value")).resolves.toBe(undefined);
  expect(mockStorage.setItem).toHaveBeenCalledWith("test-scope.key", "value");
});

test("write rejects with error if storage throws", () => {
  const error = new Error("bad");
  mockStorage.setItem.mockImplementation(() => {
    throw error;
  });
  return expect(warehouse.write("key", "value")).rejects.toBe(error);
});

test("read proxies to storage and resolves to the value returned", async () => {
  mockStorage.getItem.mockReturnValue("stored value");
  await expect(warehouse.read("key")).resolves.toBe("stored value");
  expect(mockStorage.getItem).toHaveBeenCalledWith("test-scope.key");
});

test("read rejects with error if storage throws", () => {
  const error = new Error("bad");
  mockStorage.getItem.mockImplementation(() => {
    throw error;
  });
  return expect(warehouse.read("key")).rejects.toBe(error);
});

test("remove proxies to storage and resolves to undefined", async () => {
  await expect(warehouse.remove("key")).resolves.toBe(undefined);
  expect(mockStorage.removeItem).toHaveBeenCalledWith("test-scope.key");
});

test("remove rejects with error if storage throws", () => {
  const error = new Error("bad");
  mockStorage.removeItem.mockImplementation(() => {
    throw error;
  });
  return expect(warehouse.remove("key")).rejects.toBe(error);
});

test("clear proxies to storage and resolves to undefined", async () => {
  await expect(warehouse.clear()).resolves.toBe(undefined);
  expect(mockStorage.clear).toHaveBeenCalled();
});

test("clear rejects with error if storage throws", () => {
  const error = new Error("bad");
  mockStorage.clear.mockImplementation(() => {
    throw error;
  });
  return expect(warehouse.clear()).rejects.toBe(error);
});
