import { User } from "../entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().create({
      email: "test@test.com",
      password: "asdasd",
      firstName: "Steven",
      lastName: "Hansel",
      confirmed: true,
    });
    await factory(User)().createMany(10);
  }
}
