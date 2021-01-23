import { User } from "@db/entity";
import { UserService } from "@modules/services";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "../input/RegisterInput";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => [User])
  async userById(@Arg("id") id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async register(@Arg("data") data: RegisterInput): Promise<User> {
    return await this.userService.create(data);
  }
}
