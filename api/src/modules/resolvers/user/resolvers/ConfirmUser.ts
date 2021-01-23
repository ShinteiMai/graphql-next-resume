import { User } from "@db/entity";
import { Errors } from "@tools/errors";
import { confirmUserPrefix } from "@utils/constants";
import { redis } from "@utils/main";
import { Mutation, Arg, Resolver } from "type-graphql";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) throw new Errors("NotFoundException");

    try {
      await User.update({ id: userId }, { confirmed: true });
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    await redis.del(token);

    return true;
  }
}
