import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column("varchar", { length: 255 })
  title: string;

  @Field()
  @Column("decimal")
  price: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 2083, nullable: true })
  imageUrl: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.products)
  @TypeormLoader(() => User, (product: Product) => product.ownerId)
  owner: User;

  @RelationId((product: Product) => product.owner)
  ownerId: number;
}
