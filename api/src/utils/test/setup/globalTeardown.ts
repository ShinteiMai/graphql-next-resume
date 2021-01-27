require("tsconfig-paths/register");
import { exec } from "child_process";

export default async function (): Promise<void> {
  await exec("npm run seed:drop")
}
