import { Profile } from "../entity";
import * as Faker from "faker";
import { define } from "typeorm-seeding";

define(Profile, (faker: typeof Faker) => {
  const profile = new Profile();

  profile.firstName = faker.name.firstName();
  profile.lastName = faker.name.lastName();
  profile.biography = faker.lorem.paragraphs(3);
  profile.shortBiography = faker.lorem.paragraph();
  profile.profileImageUrl = faker.image.avatar();
  profile.resumeUrl = faker.image.food();

  return profile;
});