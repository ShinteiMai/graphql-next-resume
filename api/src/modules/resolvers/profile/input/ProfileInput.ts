import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field({ nullable: true })
  @Length(1, 255)
  lastName: string;

  @Field()
  biography: string;

  @Field()
  shortBiography: string;

  @Field({ nullable: true })
  profileImageUrl: string;

  @Field({ nullable: true })
  resumeUrl: string;
}