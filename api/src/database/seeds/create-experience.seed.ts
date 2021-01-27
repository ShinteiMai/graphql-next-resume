import { Experience } from "../entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateExperience implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Experience)().createMany(15);
  }
}