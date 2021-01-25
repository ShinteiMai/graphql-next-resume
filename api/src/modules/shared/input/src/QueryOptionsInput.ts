import { IsNumber, IsOptional, IsString } from "class-validator";
import { ClassType, Field, InputType } from "type-graphql";

export const QueryOptionsMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class QueryOptionsInput extends BaseClass {
    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    limit: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    order: "ASC" | "DESC";

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    afterCursor: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    beforeCursor: string;
  }

  return QueryOptionsInput;
};
