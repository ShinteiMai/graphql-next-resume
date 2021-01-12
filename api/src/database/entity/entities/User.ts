import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  RelationId,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Product } from "./Product";
import { TypeormLoader } from "type-graphql-dataloader";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text")
  email: string;

  @Column()
  password: string;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.owner)
  @TypeormLoader(() => Product, (user: User) => user.productIds)
  products: Product[];

  @RelationId((user: User) => user.products)
  productIds: number[];

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
