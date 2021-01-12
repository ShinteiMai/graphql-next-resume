import { isAuth } from "@tools/middlewares";
import { Context } from "@tools/types";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) => {
      ctx.request.destroySession((err: Error | undefined) => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        return res(true);
      });
    });
  }
}
