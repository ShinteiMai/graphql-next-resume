import { Profile } from "../entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateProfiles implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Profile)().create({
      firstName: "Steven",
      lastName: "Hansel",
      biography:
        "Hi! I’m Steven Hansel. A software engineer based in Jakarta, Indonesia. I enjoy building software such as web & mobile applications with the most modern & latest technology available. My purpose is to create robust software following software engineering principles & best practices. I’m currently studying Computer Engineering in BINUS University as a sophomore. I started my development journey by getting into an internship in an Indonesian startup, Kotakode.",
      shortBiography:
        "a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL",
      profileImageUrl:
        "https://stevenhansel.s3-ap-southeast-1.amazonaws.com/profile.png",
      resumeUrl:
        "https://stevenhansel.s3-ap-southeast-1.amazonaws.com/resume.pdf",
    });
    await factory(Profile)().createMany(20);
  }
}
