import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { forgotPasswordPrefix } from "@utils/constants";
import { redis } from "@utils/main";
import { sendEmail } from "@utils/user";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 as uuid } from "uuid";
@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean | void> {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return Errors.NotFoundException(
        `User with the email of ${email} was not found`
      );

    const token = uuid();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);

    await sendEmail(
      email,
      `${
        process.env.ORIGIN || "http://localhost:3000"
      }/users/change-password/${token}`
    );

    return true;
  }
}
