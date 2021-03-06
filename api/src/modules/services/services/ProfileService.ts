import { Profile } from '@db/entity';
import { ProfileInput } from '@modules/resolvers/profile';
import { FindOneInput, QueryOptionsInput } from '@modules/shared/input';
import { Errors } from '@tools/errors';
import { CursorParam, PaginationResult } from '@tools/types';
import { Pagination } from '@utils/helpers';
import { Service } from 'typedi';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll({
    limit = 5,
    order = 'ASC',
    afterCursor,
    beforeCursor,
    paginationKeys = ['id'] as any,
  }: QueryOptionsInput): Promise<PaginationResult<Profile>> {
    const helper = new Pagination(Profile);
    let nextAfterCursor = '',
      nextBeforeCursor = '';
    const cursors: CursorParam = {};
    const profilesQb = this.profileRepository.createQueryBuilder('profile');
    const { escape } = profilesQb.connection.driver;

    if (!!afterCursor)
      Object.assign(cursors, helper.decode(String(afterCursor)));
    if (!!beforeCursor)
      Object.assign(cursors, helper.decode(String(beforeCursor)));

    if (Object.keys(cursors).length > 0) {
      profilesQb.andWhere(
        new Brackets((where) => {
          const params: CursorParam = {};
          let query = '';
          let operator: string;

          if (!!afterCursor) operator = order === 'ASC' ? '>' : '<';
          else if (!!beforeCursor) operator = order === 'ASC' ? '<' : '>';
          else operator = '=';

          paginationKeys.forEach((key) => {
            params[key] = cursors[key];
            where.orWhere(
              `${query}profile.${escape(key)} ${operator} :${key}`,
              params
            );
            query = `${query}profile.${escape(key)} = :${key} AND `;
          });
        })
      );
    }

    profilesQb.take(limit + 1);
    profilesQb.orderBy('profile.id', order);

    const data = await profilesQb.getMany();
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

  async findOne({ attribute = 'id', query }: FindOneInput): Promise<Profile> {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where(`profile.${attribute} = :query`, { query })
      .getOne();
    if (!profile)
      throw new Errors(
        'NotFoundException',
        `Profile with the ${attribute} of ${query} was not found`
      );
    return profile;
  }

  async findActiveProfile(): Promise<Profile> {
    const activeProfile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profie.isActive = :isActive', { isActive: true })
      .getOne();
    if (!activeProfile)
      throw new Errors('NotFoundException', 'No active profiles were found');
    return activeProfile;
  }

  async create({
    firstName,
    lastName,
    biography,
    shortBiography,
    profileImageUrl,
    resumeUrl,
  }: ProfileInput): Promise<Profile> {
    const profile = new Profile();

    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.biography = biography;
    profile.shortBiography = shortBiography;
    profile.profileImageUrl = profileImageUrl;
    profile.resumeUrl = resumeUrl;

    await profile.save();

    return profile;
  }

  async update(data: ProfileInput, profileId: string): Promise<Profile> {
    const profile = await this.findOne({ attribute: 'id', query: profileId });

    profile.firstName = data.firstName;
    profile.lastName = data.lastName;
    profile.biography = data.biography;
    profile.shortBiography = data.shortBiography;
    profile.profileImageUrl = data.profileImageUrl;
    profile.resumeUrl = data.resumeUrl;

    await profile.save();
    return profile;
  }

  async delete(profileId: string): Promise<Profile> {
    const profile = await this.findOne({ attribute: 'id', query: profileId });

    const deletedProfile = Object.assign({}, profile);

    try {
      await this.profileRepository.remove(profile);
    } catch (err) {
      throw new Errors('InternalServerErrorException');
    }

    return deletedProfile;
  }
}
