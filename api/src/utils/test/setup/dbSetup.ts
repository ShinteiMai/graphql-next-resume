require("tsconfig-paths/register");
import { setupTypeORMConnection } from "@utils/main";
setupTypeORMConnection("test").then(() => process.exit());
