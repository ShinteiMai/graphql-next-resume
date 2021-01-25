require("tsconfig-paths/register");
import { setupTypeORMConnection } from "@utils/main";
import { exec } from "child_process";
import { getConnection } from "typeorm";

export default async function (): Promise<void> {
  const conn = await setupTypeORMConnection();
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
  await exec("npm run seed:drop")
  await conn.close();
}
