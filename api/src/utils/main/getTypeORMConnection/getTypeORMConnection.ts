import { getConnection } from "typeorm";

export const getTypeORMConnection = () => {
  return getConnection(process.env.NODE_ENV);
};
