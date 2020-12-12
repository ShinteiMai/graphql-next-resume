require("tsconfig-paths/register");
import { setupTypeORMConnection } from "@utils/main";
import { getConnection } from "typeorm";

export default async function (): Promise<void> {
  const conn = await setupTypeORMConnection("test");
  const entities = getConnection("test").entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection("test").getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
  await conn.close();
}
