import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "./PasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string;

  @Field()
  password: string;
}
