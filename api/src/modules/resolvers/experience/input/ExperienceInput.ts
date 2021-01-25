import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ExperienceInput {
  @Field()
  @IsString()
  @MaxLength(255)
  role: string;

  @Field()
  @IsString()
  @MaxLength(255)
  company: string;

  @Field()
  @IsUrl()
  companyUrl: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate: Date;

  @Field()
  @IsString()
  profileId: string;
}
