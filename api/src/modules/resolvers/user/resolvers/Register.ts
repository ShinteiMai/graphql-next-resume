import * as argon2 from "argon2";
import { Mutation, Arg, Resolver } from "type-graphql";
import { createConfirmationUrl, sendEmail } from "@utils/user";
import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { RegisterInput } from "../input/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User | void> {
    if (await User.findOne({ email })) {
      return Errors.ConflictException(
        "User with the requested email already exists"
      );
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await argon2.hash(password);
    user.email = email;

    try {
      await user.save();
    } catch (err) {
      return Errors.InternalServerErrorException();
    }

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
