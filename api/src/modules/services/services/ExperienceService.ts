import { Experience } from '@db/entity';
import { ExperienceInput } from '@modules/resolvers/experience';
import { FindOneInput } from '@modules/shared/input';
import { Errors } from '@tools/errors';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProfileService } from './ProfileService';

@Service()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly profileService: ProfileService
  ) {}

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
