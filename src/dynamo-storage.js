import { checkReturn } from "./log-error";

export const createDynamoStorage = (createDynamo, table, scope) => {
  const ddb = createDynamo();

  return {
    getItem: key => {
      const params = {
        TableName: table,
        Key: {
          KEY_NAME: { S: key },
          SCOPE_NAME: { S: scope },
        },
        ProjectionExpression: "ATTRIBUTE_NAME",
      };

      ddb.getItem(params, checkReturn);
    },
    setItem: (key, value) => {
      const params = {
        TableName: table,
        Key: {
          KEY_NAME: { S: key },
          SCOPE_NAME: { S: scope },
        },
        Item: value,
      };
      ddb.putItem(params, checkReturn);
    },
    removeItem: key => {
      const params = {
        TableName: table,
        Key: {
          KEY_NAME: { S: key },
          SCOPE_NAME: { S: scope },
        },
      };

      ddb.deleteItem(params, checkReturn);
    },
    clear: () => {
      const params = {
        TableName: table,
        Key: {
          SCOPE_NAME: { S: scope },
        },
      };

      ddb.deleteItem(params, checkReturn);
    },
  };
};
