import { User } from "@db/entity";
import { AuthService, UserService } from "@modules/services";
import { Errors } from "@tools/errors";
import { isAuth } from "@tools/middlewares";
import { Context } from "@tools/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { ChangePasswordInput } from "../input/ChangePasswordInput";
import { LoginInput } from "../input/LoginInput";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User> {
    const userId = ctx.request.session?.userId;
    if (!userId) throw new Errors("UnauthorizedException");
    const user = await this.userService.findOneById(userId);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    const user = await this.authService.login(data);
    ctx.request.session.userId = user.id;

    return user;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) => {
      ctx.request.destroySession((err: Error | undefined) => {
        if (err) return rej(false);
        return res(true);
      });
    });
  }

  @Mutation(() => User)
  async confirmUser(@Arg("token") token: string): Promise<User> {
    return await this.authService.confirmUser(token);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    await this.authService.forgotPassword(email);
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async changePassword(@Arg("data") data: ChangePasswordInput): Promise<User> {
    return await this.authService.changePassword(data);
  }
}
