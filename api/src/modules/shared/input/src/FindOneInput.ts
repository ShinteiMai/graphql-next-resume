import { ClassType, Field, InputType } from "type-graphql";

export const FindOneMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class FindOneInput extends BaseClass {
    @Field({ defaultValue: "id" })
    attribute: string;

    @Field({ nullable: true })
    query: string;
  }
  return FindOneInput;
};
