import { Length, IsEmail } from "class-validator";
import { InputType } from "type-graphql";
import { Field } from "type-graphql";
import { PasswordMixin } from "./PasswordInput";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}
