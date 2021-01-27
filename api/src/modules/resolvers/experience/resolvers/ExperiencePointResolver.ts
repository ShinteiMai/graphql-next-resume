import { ExperiencePoint } from '@db/entity';
import { ExperiencePointService } from '@modules/services';
import { FindOneInput, QueryOptionsInput } from '@modules/shared/input';
import { PaginatedListMixin } from '@modules/shared/objectTypes';
import { PaginationResult } from '@tools/types';
import { Arg, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { ExperiencePointInput } from '../input/ExperiencePointInput';

@ObjectType()
export class ExperiencePointPaginated extends PaginatedListMixin(
  ExperiencePoint
) {}

@Resolver()
export class ExperiencePointResolver {
  constructor(
    private readonly experiencePointService: ExperiencePointService
  ) {}

  @Query(() => ExperiencePointPaginated)
  async experiencePoints(
    @Arg('options') options: QueryOptionsInput
  ): Promise<PaginationResult<ExperiencePoint>> {
    return this.experiencePointService.findAll(options);
  }

  @Query(() => [ExperiencePoint])
  async experiencePointsByExperienceId(
    @Arg('experienceId') experienceId: string
  ): Promise<ExperiencePoint[]> {
    return this.experiencePointService.findAllByExperienceId(experienceId);
  }

  @Query(() => ExperiencePoint)
  async experiencePoint(@Arg('options') options: FindOneInput) {
    return await this.experiencePointService.findOne(options);
  }

  @Mutation(() => ExperiencePoint)
  async createExperiencePoint(
    @Arg('data') data: ExperiencePointInput,
    @Arg('experienceId') experienceId: string
  ): Promise<ExperiencePoint> {
    return await this.experiencePointService.create(experienceId, data);
  }

  @Mutation(() => ExperiencePoint)
  async updateExperiencePoint(
    @Arg('data') data: ExperiencePointInput,
    @Arg('id') id: string
  ): Promise<ExperiencePoint> {
    return await this.experiencePointService.update(id, data);
  }

  @Mutation(() => ExperiencePoint)
  async deleteExperiencePoint(@Arg('id') id: string): Promise<ExperiencePoint> {
    return await this.experiencePointService.delete(id);
  }
}
