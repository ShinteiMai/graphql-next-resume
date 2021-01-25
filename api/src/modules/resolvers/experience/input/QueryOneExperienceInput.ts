import { FindOneMixin } from "@modules/shared/input";
import { InputType } from "type-graphql";

@InputType()
export class QuerySingleExperienceInput extends FindOneMixin(class {}) {}
