import { Product } from "@db/entity";
import { ProductService } from "@modules/services";
import { Errors } from "@tools/errors";
import { isAuth } from "@tools/middlewares";
import { Context } from "@tools/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { ProductInput } from "../input/ProductInput";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async product(@Arg("id") id: string) {
    return await this.productService.findOne(id);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Product)
  async createProduct(
    @Arg("data") data: ProductInput,
    @Ctx() ctx: Context
  ): Promise<Product | void> {
    const userId = ctx.request.session?.userId;
    if (!userId) {
      return Errors.UnauthorizedException();
    }
    const product = await this.productService.create(data, userId);
    return product;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Product)
  async updateProduct(
    @Arg("productId") productId: string,
    @Arg("data") data: ProductInput,
    @Ctx() ctx: Context
  ): Promise<Product | void> {
    const userId = ctx.request.session?.userId;
    if (!userId) {
      return Errors.UnauthorizedException();
    }
    const updatedProduct = await this.productService.update(
      data,
      productId,
      userId
    );
    return updatedProduct;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Product)
  async deleteProduct(
    @Arg("productId") productId: string
  ): Promise<Product | void> {
    const deletedProduct = await this.productService.delete(productId);
    return deletedProduct;
  }
}
