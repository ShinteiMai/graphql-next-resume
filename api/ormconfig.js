/** ormconfig.js is only used for typeorm-seeding, for real-connection useCase, check setupTypeORMConnection.ts  */
module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.NODE_ENV === "production" ? "database" : "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: process.env.NODE_ENV === "test" ? "stevenhansel-test" : "stevenhansel",
  synchronize: true,
  logging: false,
  entities: ["src/database/entity/**/*.*"],
  seeds: ["src/database/seeds/**/*{.ts,.js}"],
  factories: ["src/database/factories/**/*{.ts,.js}"],
};
