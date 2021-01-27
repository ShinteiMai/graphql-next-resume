import { Field, InputType } from 'type-graphql';
@InputType({ isAbstract: true })
export class FindOneInput {
  @Field({ defaultValue: 'id' })
  attribute: string;

  @Field({ nullable: true })
  query: string;
}
