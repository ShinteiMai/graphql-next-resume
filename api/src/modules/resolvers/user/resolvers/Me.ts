import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { isAuth } from "@tools/middlewares";
import { Context } from "@tools/types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | void> {
    const userId = ctx.request.session?.userId;
    if (!userId) {
      return Errors.UnauthorizedException();
    }

    return await User.findOne(userId);
  }
}
