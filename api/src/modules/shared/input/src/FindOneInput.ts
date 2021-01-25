import { Field, InputType } from "type-graphql";

@InputType()
export class FindOneInput {
  @Field({ defaultValue: "id" })
  attribute: string;

  @Field({ nullable: true })
  query: string;
}
