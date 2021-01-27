import { Experience } from '@db/entity';
import { ExperienceInput } from '@modules/resolvers/experience';
import { FindOneInput, QueryOptionsInput } from '@modules/shared/input';
import { Errors } from '@tools/errors';
import { CursorParam, PaginationResult } from '@tools/types';
import { Pagination } from '@utils/helpers';
import { Service } from 'typedi';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProfileService } from './ProfileService';

@Service()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly profileService: ProfileService
  ) {}

  async findAll({
    limit = 5,
    order = 'ASC',
    beforeCursor,
    afterCursor,
    paginationKeys = ['id'] as any,
  }: QueryOptionsInput): Promise<PaginationResult<Experience>> {
    let nextBeforeCursor = '',
      nextAfterCursor = '';
    const helper = new Pagination(Experience);

    const experienceQb = this.experienceRepository.createQueryBuilder(
      'experience'
    );
    const { escape } = experienceQb.connection.driver;
    const cursors: CursorParam = {};

    if (afterCursor) {
      Object.assign(cursors, helper.decode(String(afterCursor)));
    }
    if (beforeCursor) {
      Object.assign(cursors, helper.decode(String(beforeCursor)));
    }

    if (Object.keys(cursors).length > 0) {
      experienceQb.andWhere(
        new Brackets((where) => {
          let query = '';
          const params: CursorParam = {};
          let operator: string;

          if (afterCursor) {
            operator = order === 'ASC' ? '>' : '<';
          } else if (beforeCursor) {
            operator = order === 'ASC' ? '<' : '>';
          } else {
            operator = '=';
          }

          paginationKeys.forEach((key) => {
            params[key] = cursors[key];

            where.orWhere(
              `${query}experience.${escape(key)} ${operator} :${key}`,
              params
            );
            query = `${query}experience.${escape(key)} = :${key} AND `;
          });
        })
      );
    }

    experienceQb.take(limit + 1);
    experienceQb.orderBy('experience.id', order);
    let data: Experience[];
    try {
      data = await experienceQb.getMany();
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    const hasMore = data.length > limit;

    if (hasMore) {
      data.splice(data.length - 1, 1);
    }

    if (data.length === 0) {
      return {
        data,
        cursor: {},
      };
    }

    if (!afterCursor && beforeCursor) {
      data.reverse();
    }

    if (beforeCursor || hasMore) {
      nextAfterCursor = helper.encode(data[data.length - 1], paginationKeys);
    }
    if (afterCursor || (hasMore && beforeCursor)) {
      nextBeforeCursor = helper.encode(data[0], paginationKeys);
    }

    return {
      data,
      cursor: {
        afterCursor: nextAfterCursor,
        beforeCursor: nextBeforeCursor,
      },
    };
  }

  async findAllByProfileId(profileId: string): Promise<Experience[]> {
    const experiences = await this.experienceRepository
      .createQueryBuilder('experience')
      .leftJoinAndSelect('experience.profile', 'profile')
      .where('profile.id = :profileId', { profileId })
      .getMany();

    return experiences;
  }

  async findOne({ attribute, query }: FindOneInput): Promise<Experience> {
    const experience = await this.experienceRepository
      .createQueryBuilder('experience')
      .andWhere(`experience.${attribute} = :query`, { query })
      .getOne();

    if (!experience)
      throw new Errors(
        'NotFoundException',
        `Experience with the ${attribute} of ${query} was not found`
      );

    return experience;
  }

  async create({
    role,
    company,
    companyUrl,
    startDate,
    endDate,
    profileId,
  }: ExperienceInput): Promise<Experience> {
    const profile = await this.profileService.findOne({
      attribute: 'id',
      query: profileId,
    });

    const experience = new Experience();

    experience.role = role;
    experience.company = company;
    experience.companyUrl = companyUrl;
    experience.startDate = startDate;
    experience.endDate = endDate;

    experience.profile = profile;

    try {
      await experience.save();
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return experience;
  }

  async update(
    experienceId: string,
    {
      role,
      company,
      companyUrl,
      startDate,
      endDate,
      profileId,
    }: ExperienceInput
  ): Promise<Experience> {
    const experience = await this.findOne({
      attribute: 'id',
      query: experienceId,
    });

    const profile = await this.profileService.findOne({
      attribute: 'id',
      query: profileId,
    });

    experience.role = role;
    experience.company = company;
    experience.companyUrl = companyUrl;
    experience.startDate = startDate;
    experience.endDate = endDate;

    experience.profile = profile;

    try {
      await experience.save();
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return experience;
  }

  async delete(experienceId: string): Promise<Experience> {
    const experience = await this.findOne({
      attribute: 'id',
      query: experienceId,
    });

    const deletedExperience = Object.assign({}, experience);

    try {
      await this.experienceRepository.remove(experience);
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return deletedExperience;
  }
}
