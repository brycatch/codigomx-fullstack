import Server from "./server";
import {
  testConnection as userTestConnection,
  sync as userSync,
} from "./modules/user/database";

import {
  testConnection as genderTestConnection,
  sync as genderSync,
} from "./modules/gender/database";

Server.instance.init(async () => {
  console.log(`Server is running at port: ${Server.instance.port}`);
  await userTestConnection();
  await userSync();

  await genderTestConnection();
  await genderSync();
});
