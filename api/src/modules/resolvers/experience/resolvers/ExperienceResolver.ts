import { Experience } from '@db/entity';
import { ExperienceService } from '@modules/services';
import { FindOneInput, QueryOptionsInput } from '@modules/shared/input';
import { PaginatedListMixin } from '@modules/shared/objectTypes';
import { PaginationResult } from '@tools/types';
import { Arg, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { ExperienceInput } from '../input/ExperienceInput';

@ObjectType()
class ExperiencesPaginated extends PaginatedListMixin(Experience) {}

@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => ExperiencesPaginated)
  async experiences(
    @Arg('options') options: QueryOptionsInput
  ): Promise<PaginationResult<Experience>> {
    return this.experienceService.findAll(options);
  }

  @Query(() => [Experience])
  async experiencesByProfile(
    @Arg('profileId') profileId: string
  ): Promise<Experience[]> {
    return this.experienceService.findAllByProfileId(profileId);
  }

  @Query(() => Experience)
  async experience(@Arg('options') options: FindOneInput): Promise<Experience> {
    return await this.experienceService.findOne(options);
  }

  @Mutation(() => Experience)
  async createExperience(
    @Arg('data') data: ExperienceInput
  ): Promise<Experience> {
    return await this.experienceService.create(data);
  }

  @Mutation(() => Experience)
  async updateExperience(
    @Arg('data') data: ExperienceInput,
    @Arg('id') id: string
  ): Promise<Experience> {
    return await this.experienceService.update(id, data);
  }

  @Mutation(() => Experience)
  async deleteExperience(@Arg('id') id: string): Promise<Experience> {
    return await this.experienceService.delete(id);
  }
}
