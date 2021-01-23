import { User } from "@db/entity";
import { Service } from "typedi";
import { UserService } from "./UserService";
import * as argon2 from "argon2";
import { Errors } from "@tools/errors";
import { LoginInput } from "@modules/resolvers/user/input/LoginInput";
import { v4 as uuid } from "uuid";
import { redis } from "@utils/main";
import { confirmUserPrefix, forgotPasswordPrefix } from "@utils/constants";
import { sendEmail } from "@utils/user";
import { ChangePasswordInput } from "@modules/resolvers/user";

@Service()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({ email, password }: LoginInput): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user.confirmed)
      throw new Errors("UnauthorizedException", "Email is not confirmed");

    if (!(await argon2.verify(user.password, password)))
      throw new Errors(
        "UnauthorizedException",
        "Authentication Failed, Email or Password is invalid"
      );

    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email);
    const token = uuid();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 1);
    await sendEmail(
      email,
      `${
        process.env.ORIGIN || "http://localhost:3000"
      }/users/change-password/${token}`
    );
  }

  async changePassword({
    token,
    password,
  }: ChangePasswordInput): Promise<User> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      throw new Errors("UnauthorizedException");
    }

    const user = await this.userService.findOneById(userId);

    try {
      await redis.del(forgotPasswordPrefix + token);
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    user.password = await argon2.hash(password);
    try {
      await user.save();
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    return user;
  }

  async confirmUser(token: string): Promise<User> {
    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) throw new Errors("NotFoundException");

    const user = await this.userService.findOneById(userId);
    user.confirmed = true;

    try {
      await user.save();
    } catch (err) {
      throw new Errors("NotFoundException");
    }

    await redis.del(token);

    return user;
  }
}
