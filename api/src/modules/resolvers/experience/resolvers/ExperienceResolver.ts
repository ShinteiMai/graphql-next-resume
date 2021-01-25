import { Experience } from "@db/entity";
import { ExperienceService } from "@modules/services";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ExperienceInput } from "../input/ExperienceInput";
import { QuerySingleExperienceInput } from "../input/QueryOneExperienceInput";

@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  // @Query(() => [Experience])
  // async experiences(): Promise<Experience[]> {}

  // @Query(() => [Experience])
  // async experiencesByProfile(
  //   @Arg("profileId") profileId: string
  // ): Promise<Experience[]> {}

  @Query(() => Experience)
  async experience(
    @Arg("options") options: QuerySingleExperienceInput
  ): Promise<Experience> {
    return await this.experienceService.findOne(options);
  }

  @Mutation(() => Experience)
  async createExperience(
    @Arg("data") data: ExperienceInput
  ): Promise<Experience> {
    return await this.experienceService.create(data);
  }

  @Mutation(() => Experience)
  async updateExperience(
    @Arg("data") data: ExperienceInput,
    @Arg("id") id: string
  ): Promise<Experience> {
    return await this.experienceService.update(id, data);
  }

  @Mutation(() => Experience)
  async deleteExperience(@Arg("id") id: string): Promise<Experience> {
    return await this.experienceService.delete(id);
  }
}
