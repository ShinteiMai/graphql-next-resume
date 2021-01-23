require("tsconfig-paths/register");
import { setupTypeORMConnection } from "@utils/main";
setupTypeORMConnection().then(() => process.exit());
