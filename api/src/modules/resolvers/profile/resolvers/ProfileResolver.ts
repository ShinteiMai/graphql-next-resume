import { Profile } from "@db/entity";
import { ProfileService } from "@modules/services";
import { PaginatedListMixin } from "@modules/shared/objectTypes";
import { PaginationResult } from "@tools/types";
import { Arg, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { ProfileInput } from "../input/ProfileInput";
import { QueryProfilesInput } from "../input/QueryProfilesInput";
import { QuerySingleProfileInput } from "../input/QuerySingleProfileInput";

@ObjectType()
export class ProfilePaginated extends PaginatedListMixin(Profile) {}

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfilePaginated)
  async profiles(
    @Arg("options") options: QueryProfilesInput
  ): Promise<PaginationResult<Profile>> {
    return await this.profileService.findAll(options);
  }

  @Query(() => Profile)
  async profile(
    @Arg("options") options: QuerySingleProfileInput
  ): Promise<Profile> {
    return await this.profileService.findOne(options);
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
