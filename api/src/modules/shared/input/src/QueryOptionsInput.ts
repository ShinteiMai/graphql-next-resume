import { Field, InputType } from "type-graphql";

@InputType()
export class QueryOptionsInput {
  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  order: "ASC" | "DESC";

  @Field({ nullable: true })
  afterCursor: string;

  @Field({ nullable: true })
  beforeCursor: string;
}
