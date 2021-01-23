import { Profile } from "@db/entity";
import { ProfileService } from "@modules/services";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProfileInput } from "../input/ProfileInput";

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile])
  async profiles(): Promise<Profile[]> {
    return await this.profileService.findAll();
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
