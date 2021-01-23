import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import * as argon2 from "argon2";

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

  // @Field(() => [Product])
  // @OneToMany(() => Product, (product) => product.owner)
  // @TypeormLoader(() => Product, (user: User) => user.productIds)
  // products: Product[];

  // @RelationId((user: User) => user.products)
  // productIds: number[];

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
}
