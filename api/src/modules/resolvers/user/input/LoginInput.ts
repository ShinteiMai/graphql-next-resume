import { IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
