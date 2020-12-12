import * as argon2 from "argon2";
import { Mutation, Arg, Resolver, UseMiddleware } from "type-graphql";
import { redis } from "@utils/main";
import { forgotPasswordPrefix } from "@utils/constants";
import { ChangePasswordInput } from "../input/ChangePasswordInput";
import { User } from "@db/entity";
import { isAuth } from "@tools/middlewares";
import { Errors } from "@tools/errors";

@Resolver()
export class ChangePasswordResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput
  ): Promise<User | void> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return Errors.UnauthorizedException();
    }

    const user = await User.findOne(userId);
    if (!user) {
      return Errors.NotFoundException();
    }

    try {
      await redis.del(forgotPasswordPrefix + token);
    } catch (err) {
      return Errors.InternalServerErrorException();
    }

    user.password = await argon2.hash(password);
    try {
      await user.save();
    } catch (err) {
      return Errors.InternalServerErrorException();
    }

    return user;
  }
}
