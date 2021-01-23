import { User } from "@db/entity";
import { RegisterInput } from "@modules/resolvers/user/input/RegisterInput";
import { Errors } from "@tools/errors";
import { createConfirmationUrl, sendEmail } from "@utils/user";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    let users: User[];
    try {
      users = await this.userRepository.createQueryBuilder("user").getMany();
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    return users;
  }

  async findOneById(id: string): Promise<User> {
    let user: User | undefined;
    try {
      user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", { id })
        .getOne();
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    if (!user) throw new Errors("NotFoundException");
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    let user: User | undefined;
    try {
      user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    if (!user) throw new Errors("NotFoundException");
    return user;
  }

  async create({
    email,
    firstName,
    lastName,
    password,
  }: RegisterInput): Promise<User> {
    if (
      await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne()
    )
      throw new Errors(
        "ConflictException",
        `User with the email of ${email} already exists, please try another email`
      );

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.email = email;

    try {
      await user.save();
    } catch (err) {
      throw new Errors("InternalServerErrorException");
    }

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }

  // async update() {}
  // async delete() {}
}
