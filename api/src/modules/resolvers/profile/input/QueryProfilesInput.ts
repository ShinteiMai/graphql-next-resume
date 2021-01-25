import { QueryOptionsMixin } from "@modules/shared/input";
import { InputType } from "type-graphql";

@InputType()
export class QueryProfilesInput extends QueryOptionsMixin(class {}) {}
