import { createWarehouse } from "./warehouse";
import { createDynamoStorage } from "./dynamo-storage";

jest.mock("./dynamo-storage");

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

  warehouse = createWarehouse({ table: "test-table", scope: "test-scope" });
});

test("can create in-memory-storage", async () => {
  global.window.localStorage = null;

  const warehouse1 = createWarehouse({
    table: "test-table",
    scope: "test-scope",
  });
  const warehouse2 = createWarehouse({
    table: "test-table",
    scope: "test-scope",
  });

  await warehouse1.write("key", "value");

  expect(warehouse1.read("key")).resolves.toBe("value");
  expect(warehouse2.read("key")).resolves.toBe(null);
});

test("can create dynamostorage", async () => {
  global.window.localStorage = null;

  const fakeDynamoStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  createDynamoStorage.mockImplementation(() => fakeDynamoStorage);
  const createDynamo = () => {};
  const dynamoWarehouse = createWarehouse({
    table: "test-table",
    scope: "test-scope",
    createDynamo,
  });

  await expect(dynamoWarehouse.write("key", "value")).resolves.toBe(undefined);
  expect(fakeDynamoStorage.setItem).toHaveBeenCalledWith("key", "value");
});

test("write proxies to storage and resolves to undefined", async () => {
  await expect(warehouse.write("key", "value")).resolves.toBe(undefined);
  expect(mockStorage.setItem).toHaveBeenCalledWith(
    "test-table.test-scope.key",
    "value"
  );
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
  expect(mockStorage.getItem).toHaveBeenCalledWith("test-table.test-scope.key");
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
  expect(mockStorage.removeItem).toHaveBeenCalledWith(
    "test-table.test-scope.key"
  );
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
