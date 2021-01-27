import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ExperiencePointInput {
  @Field()
  @IsString()
  description: string;
}
