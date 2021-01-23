require("tsconfig-paths/register");
import { setupTypeORMConnection } from "@utils/main";
import { getConnection } from "typeorm";

export default async function (): Promise<void> {
  const conn = await setupTypeORMConnection();
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
  await conn.close();
}
