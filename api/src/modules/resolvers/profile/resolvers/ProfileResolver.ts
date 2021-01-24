import { Profile } from "@db/entity";
import { ProfileService } from "@modules/services";
import { QueryOptionsInput } from "@modules/shared/input";
import { PaginationCursor } from "@modules/shared/objectTypes";
import { PaginationResult } from "@tools/types";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { ProfileInput } from "../input/ProfileInput";

@ObjectType()
export class ProfilePaginated {
  @Field(() => [Profile])
  data: Profile[];

  @Field()
  cursor: PaginationCursor;
}

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfilePaginated)
  async profiles(
    @Arg("query") data: QueryOptionsInput
  ): Promise<PaginationResult<Profile>> {
    return await this.profileService.findAll(data);
  }

  @Query(() => Profile)
  async profile(@Arg("id") id: string): Promise<Profile> {
    return await this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  async createProfile(@Arg("data") data: ProfileInput): Promise<Profile> {
    const profile = await this.profileService.create(data);
    return profile;
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("data") data: ProfileInput,
    @Arg("id") id: string
  ): Promise<Profile> {
    const profile = await this.profileService.update(data, id);
    return profile;
  }

  @Mutation(() => Profile)
  async deleteProfile(@Arg("id") id: string): Promise<Profile> {
    const profile = await this.profileService.delete(id);
    return profile;
  }
}
