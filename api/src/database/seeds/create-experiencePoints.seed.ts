import { ExperiencePoint } from '../entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateExperiencePoints implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(ExperiencePoint)().createMany(15);
  }
}
