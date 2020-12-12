import { BaseEntity, createConnection, getConnectionOptions } from "typeorm";

export const setupTypeORMConnection = async (name?: string) => {
  const options = await getConnectionOptions(
    name || process.env.NODE_ENV || "test"
  );
  const connection = await createConnection(options);
  BaseEntity.useConnection(connection);
  return connection;
};
