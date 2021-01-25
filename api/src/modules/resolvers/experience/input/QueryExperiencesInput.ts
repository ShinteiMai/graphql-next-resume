import { QueryOptionsMixin } from "@modules/shared/input";
import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class QueryExperiencesInput extends QueryOptionsMixin(class {}) {
  @Field()
  @IsString()
  profileId: string;
}
