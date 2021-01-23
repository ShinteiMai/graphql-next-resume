import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", onUpdate: "CURRENT_TIMESTAMP", nullable: true })
  updatedAt: Date;
}
