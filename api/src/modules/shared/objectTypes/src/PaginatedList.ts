import { ClassType, Field, ObjectType } from 'type-graphql';
import { PaginationCursor } from './PaginationCursor';

export const PaginatedListMixin = <T extends ClassType>(BaseClass: T) => {
  @ObjectType({ isAbstract: true })
  class PaginatedListInput {
    @Field(() => [BaseClass])
    data: T[];

    @Field()
    cursor: PaginationCursor;
  }
  return PaginatedListInput;
};
