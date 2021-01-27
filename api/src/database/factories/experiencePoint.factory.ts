import { Experience, ExperiencePoint } from '../entity';
import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';

define(ExperiencePoint, (faker: typeof Faker) => {
  const point = new ExperiencePoint();

  point.description = faker.lorem.paragraphs(3);
  point.experience = factory(Experience)() as any;

  return point;
});
