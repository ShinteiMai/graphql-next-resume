import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { Context } from "@tools/types";
import * as argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { LoginInput } from "../input/LoginInput";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Errors("NotFoundException");
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid)
      throw new Errors(
        "UnauthorizedException",
        "Authentication failed, email or password is invalid"
      );

    if (!user.confirmed)
      throw new Errors("UnauthorizedException", "User is not confirmed");

    ctx.request.session.userId = user.id;

    return user;
  }
}
