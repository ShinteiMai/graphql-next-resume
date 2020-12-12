import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
