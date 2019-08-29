import { getItem, putItem } from "@enlearn/js-helpers";

// A storage object can be thought of as private to one user or domain
export const createDynamoStorage = (table, scope) => {
  const pSetItem = (key, value) => {
    let item = getItem(table, { scope });
    if (item === undefined) {
      item = { scope };
    }

    item[key] = value;
    putItem(table, item);
  };

  return {
    getItem: async key => {
      const item = await getItem(table, { scope });
      return item[key];
    },
    setItem: async (key, value) => {
      await pSetItem(key, value);
    },
    removeItem: async key => {
      await pSetItem(key, undefined);
    },
  };
};
