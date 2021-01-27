import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ isAbstract: true })
export class QueryOptionsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  limit: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  order: 'ASC' | 'DESC';

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  afterCursor: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  beforeCursor: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  paginationKeys: string[];
}
