import Container from "typedi";
import {
  BaseEntity,
  ConnectionOptions,
  createConnection,
  useContainer,
} from "typeorm";

interface TypeORMEnvironmentOptions {
  database: string;
  logging: boolean;
}

const createTypeORMConnection = (): ConnectionOptions & {
  seeds: string[];
  factories: string[];
} => {
  let environmentOptions: TypeORMEnvironmentOptions = {
    database: "stevenhansel",
    logging: true,
  };
  switch (process.env.NODE_ENV) {
    case "test":
      environmentOptions = {
        database: "stevenhansel-test",
        logging: false,
      };
      break;
    case "production":
      environmentOptions = {
        database: "stevenhansel-prod",
        logging: false,
      };
      break;
    default:
      break;
  }
  return {
    name: "default",
    type: "postgres",
    host: process.env.NODE_ENV === "production" ? "database" : "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    synchronize: true,
    entities: ["src/database/entity/**/*.*"],
    seeds: ["src/database/seeds/**/*{.ts,.js}"],
    factories: ["src/database/factories/**/*{.ts,.js}"],
    ...environmentOptions,
  };
};

export const setupTypeORMConnection = async () => {
  useContainer(Container);

  const options: ConnectionOptions = createTypeORMConnection();
  const connection = await createConnection(options);
  BaseEntity.useConnection(connection);
  return connection;
};
