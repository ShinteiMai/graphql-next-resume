import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Experience } from "./Experience";

@ObjectType()
@Entity()
export class ExperiencePoint {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column("text")
  description: string;

  @Field(() => Experience)
  @ManyToOne(() => Experience, (experience) => experience.points)
  @TypeormLoader(() => Experience, (point: ExperiencePoint) => point.experienceId)
  experience: Experience;

  @RelationId((point: ExperiencePoint) => point.experience)
  experienceId: number;
}
