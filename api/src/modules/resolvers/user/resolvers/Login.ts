import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { Context } from "@tools/types";
import * as argon2 from "argon2";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { LoginInput } from "../input/LoginInput";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | void> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return Errors.NotFoundException("User not found");
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return Errors.UnauthorizedException("Authentication Error");
    }

    if (!user.confirmed) {
      return Errors.UnauthorizedException("User is not confirmed");
    }

    ctx.req.session!.userId = user.id;
    return user;
  }
}
