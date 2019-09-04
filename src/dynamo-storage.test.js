import { createDynamoStorage } from "./dynamo-storage";
import { getItem, putItem } from "@enlearn/js-helpers";
jest.mock("@enlearn/js-helpers");

let storage;

beforeEach(() => {
  storage = createDynamoStorage("some-table", "some-scope");
});

test("setItem pass through to putItem", async () => {
  const value = "some-value";
  await storage.setItem("some key", value);
  expect(putItem).toHaveBeenCalledWith("some-table", {
    "some key": "some-value",
    scope: "some-scope",
  });
});

test("setItem overwrites previous value", async () => {
  getItem.mockReturnValue({
    "some-key": "return-value",
    "some-other-key": "unimportant-value",
  });

  const value = "some-new-value";
  await storage.setItem("some-key", value);
  expect(putItem).toHaveBeenCalledWith("some-table", {
    "some-key": "some-new-value",
    "some-other-key": "unimportant-value",
  });
});

test("getItem", async () => {
  getItem.mockReturnValue({ "some-key": "return-value" });
  const r = await storage.getItem("some-key");
  expect(r).toEqual("return-value");
  expect(getItem).toHaveBeenCalledWith("some-table", { scope: "some-scope" });
});

test("delete item writes value to undefined", async () => {
  await storage.removeItem("some-key");
  expect(putItem).toHaveBeenCalledWith("some-table", {
    "some-key": undefined,
  });
});
