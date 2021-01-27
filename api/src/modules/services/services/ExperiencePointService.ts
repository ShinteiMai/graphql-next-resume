import { ExperiencePoint } from '@db/entity';
import { ExperiencePointInput } from '@modules/resolvers/experience';
import { FindOneInput, QueryOptionsInput } from '@modules/shared/input';
import { Errors } from '@tools/errors';
import { CursorParam, PaginationResult } from '@tools/types';
import { Pagination } from '@utils/helpers';
import { Service } from 'typedi';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ExperienceService } from './ExperienceService';

@Service()
export class ExperiencePointService {
  constructor(
    @InjectRepository(ExperiencePoint)
    private readonly pointRepository: Repository<ExperiencePoint>,
    private readonly experienceService: ExperienceService
  ) {}

  async findAll({
    limit = 5,
    order = 'ASC',
    afterCursor,
    beforeCursor,
    paginationKeys = ['id'] as any,
  }: QueryOptionsInput): Promise<PaginationResult<ExperiencePoint>> {
    let nextAfterCursor = '',
      nextBeforeCursor = '';
    const helper = new Pagination(ExperiencePoint);

    const pointsQb = this.pointRepository.createQueryBuilder('point');
    const { escape } = pointsQb.connection.driver;
    const cursors: CursorParam = {};

    if (afterCursor) Object.assign(cursors, helper.decode(String(afterCursor)));
    if (beforeCursor)
      Object.assign(cursors, helper.decode(String(beforeCursor)));

    if (Object.keys(cursors).length > 0)
      pointsQb.andWhere(
        new Brackets((where) => {
          let query = '';
          let operator: string;
          const params: CursorParam = {};

          if (afterCursor) operator = order === 'ASC' ? '>' : '<';
          else if (beforeCursor) operator = order === 'ASC' ? '<' : '>';
          else operator = '=';

          paginationKeys.forEach((key) => {
            params[key] = cursors[key];

            where.orWhere(
              `${query}point.${escape(key)} ${operator} :${key}`,
              params
            );
            query = `${query}point.${escape(key)} = :${key} AND `;
          });
        })
      );

    pointsQb.take(limit + 1);
    pointsQb.orderBy('point.id', order);

    const data = await pointsQb.getMany();

    const hasMore = data.length > limit;

    if (hasMore) data.splice(data.length - 1, 1);
    if (data.length === 0) return { data, cursor: {} };
    if (!afterCursor && beforeCursor) data.reverse();

    if (beforeCursor || hasMore)
      nextAfterCursor = helper.encode(data[data.length - 1], paginationKeys);
    if (afterCursor || (hasMore && beforeCursor))
      nextBeforeCursor = helper.encode(data[0], paginationKeys);

    return {
      data,
      cursor: {
        afterCursor: nextAfterCursor,
        beforeCursor: nextBeforeCursor,
      },
    };
  }

  async findAllByExperienceId(
    experienceId: string
  ): Promise<ExperiencePoint[]> {
    const points = await this.pointRepository
      .createQueryBuilder('point')
      .leftJoinAndSelect('point.experience', 'experience')
      .where('experience.id = :experienceId', { experienceId })
      .getMany();

    return points;
  }

  async findOne({ attribute, query }: FindOneInput): Promise<ExperiencePoint> {
    const point = await this.pointRepository
      .createQueryBuilder('point')
      .where(`point.${attribute} = :query`, { query })
      .getOne();

    if (!point)
      throw new Errors(
        'NotFoundException',
        `Point with the ${attribute} of ${query} was not found`
      );

    return point;
  }

  async create(
    experienceId: string,
    { description }: ExperiencePointInput
  ): Promise<ExperiencePoint> {
    const experience = await this.experienceService.findOne({
      attribute: 'id',
      query: experienceId,
    });

    const point = new ExperiencePoint();

    point.description = description;
    point.experience = experience;

    try {
      await point.save();
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return point;
  }

  async update(
    pointId: string,
    { description }: ExperiencePointInput
  ): Promise<ExperiencePoint> {
    const point = await this.findOne({ attribute: 'id', query: pointId });

    point.description = description;

    try {
      await point.save();
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return point;
  }

  async delete(pointId: string): Promise<ExperiencePoint> {
    const point = await this.findOne({ attribute: 'id', query: pointId });

    const deletedPoint = Object.assign({}, point);

    try {
      await this.pointRepository.remove(point);
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return deletedPoint;
  }
}
