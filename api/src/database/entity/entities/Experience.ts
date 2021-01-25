import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { ExperiencePoint } from "./ExperiencePoint";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Experience extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column("varchar", { length: 255 })
  role: string;

  @Field()
  @Column("varchar", { length: 255 })
  company: string;

  @Field()
  @Column("text")
  companyUrl: string;

  @Field()
  @Column("timestamp")
  startDate: Date;

  @Field({ nullable: true })
  @Column("timestamp", { nullable: true })
  endDate: Date;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.experiences)
  @TypeormLoader(
    () => Profile,
    (experience: Experience) => experience.profileId
  )
  profile: Profile;

  @RelationId((experience: Experience) => experience.profile)
  profileId: number;

  @Field(() => [ExperiencePoint])
  @OneToMany(() => ExperiencePoint, (point) => point.experience)
  @TypeormLoader(
    () => ExperiencePoint,
    (experience: Experience) => experience.pointIds
  )
  points: ExperiencePoint[];

  @RelationId((experience: Experience) => experience.points)
  pointIds: number[];
}
