import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  imageUrl: string;
}
