import { setupTypeORMConnection } from "@utils/main";
import { Connection } from "typeorm";

let conn: Connection;
global.beforeAll(async () => {
  conn = await setupTypeORMConnection();
});
global.afterAll(async () => {
  await conn.close();
});
