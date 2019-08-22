import { createDynamoStorage } from "./dynamo-storage";
import { checkReturn } from "./log-error";

let fakeDynamoDb;
let storage;

beforeEach(() => {
  fakeDynamoDb = {
    getItem: jest.fn(),
    putItem: jest.fn(),
    deleteItem: jest.fn(),
  };

  storage = createDynamoStorage(() => fakeDynamoDb, "some-table", "some-scope");
});

test("can get and set strings", () => {
  storage.setItem("some key", "some value");
  expect(fakeDynamoDb.putItem).toHaveBeenCalledWith(
    {
      Item: "some value",
      Key: { KEY_NAME: { S: "some key" }, SCOPE_NAME: { S: "some-scope" } },
      TableName: "some-table",
    },
    checkReturn
  );
});

// test("stored items are always turned into strings", () => {
//   storage.setItem("a", 123);
//   expect(typeof storage.getItem("a")).toBe("string");
// });

// test("querying for non-existent key returns null", () => {
//   expect(storage.getItem("random key")).toBe(null);
// });

// test("stored items can be removed", () => {
//   storage.setItem("a", "1");
//   storage.removeItem("a");
//   expect(storage.getItem("a")).toBe(null);
// });

// test("entire storage can be cleared", () => {
//   storage.setItem("a", "1");
//   storage.setItem("b", "2");
//   storage.clear();
//   expect(storage.getItem("a")).toBe(null);
//   expect(storage.getItem("b")).toBe(null);
// });
