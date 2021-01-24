import { User } from "../entity";
import * as Faker from "faker";
import { define } from "typeorm-seeding";

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();

  return user;
});
