import { Experience, Profile } from '../entity';
import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Experience, (faker: typeof Faker) => {
  const experience = new Experience();

  experience.role = faker.name.jobTitle();
  experience.company = faker.company.companyName();
  experience.companyUrl = faker.internet.url();
  experience.startDate = faker.date.past();
  experience.endDate = faker.date.recent();
  experience.profile = factory(Profile)() as any;

  return experience;
});
