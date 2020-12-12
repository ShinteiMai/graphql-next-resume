import { isAuth } from "@tools/middlewares";
import { Context } from "@tools/types";
import { Mutation, Resolver, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((res, rej) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      });
    });
  }
}
