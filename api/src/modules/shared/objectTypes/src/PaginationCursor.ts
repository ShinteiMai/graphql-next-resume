import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginationCursor {
  @Field({ nullable: true })
  afterCursor: string;

  @Field({ nullable: true })
  beforeCursor: string;
}
