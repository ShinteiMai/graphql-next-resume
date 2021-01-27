import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Experience } from "./Experience";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column("varchar", { length: 255 })
  firstName: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255 })
  lastName: string;

  @Field()
  @Column("text")
  biography: string;

  @Field()
  @Column("text")
  shortBiography: string;

  @Field({ nullable: true })
  @Column("text")
  profileImageUrl: string;

  @Field({ nullable: true })
  @Column("text")
  resumeUrl: string;

  @Field(() => [Experience])
  @OneToMany(() => Experience, (experience) => experience.profile)
  @TypeormLoader(() => Experience, (profile: Profile) => profile.experienceIds)
  experiences: Experience[];

  @RelationId((profile: Profile) => profile.experiences)
  experienceIds: number[];

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", onUpdate: "CURRENT_TIMESTAMP", nullable: true })
  updatedAt: Date;
}
