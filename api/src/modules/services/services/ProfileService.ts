import { Profile } from "@db/entity";
import { ProfileInput } from "@modules/resolvers/profile";
import { Errors } from "@tools/errors";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<Profile[]> {
    const profiles = this.profileRepository
      .createQueryBuilder("profile")
      .getMany();
    return profiles;
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileRepository
      .createQueryBuilder("profile")
      .where("profile.id = :id", { id })
      .getOne();
    if (!profile) throw new Errors("NotFoundException");
    return profile;
  }

  async findActiveProfile(): Promise<Profile> {
    const activeProfile = await this.profileRepository
      .createQueryBuilder("profile")
      .where("profie.isActive = :isActive", { isActive: true })
      .getOne();
    if (!activeProfile) throw new Errors("NotFoundException");
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
    const profile = await this.profileRepository
      .createQueryBuilder("profile")
      .where("profile.id = :id", { id: profileId })
      .getOne();

    if (!profile) throw new Error();

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
    const profile = await this.profileRepository
      .createQueryBuilder("profile")
      .where("profile.id = :id", { id: profileId })
      .getOne();

    if (!profile) throw new Error();
    const p = Object.assign({}, profile);
    await this.profileRepository.remove(profile);
    return p;
  }
}
