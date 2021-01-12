import { Product, User } from "@db/entity";
import { ProductInput } from "@modules/resolvers/product";
import { Errors } from "@tools/errors";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productService: Repository<Product>,
    @InjectRepository(User)
    private readonly userService: Repository<User>
  ) {}
  async findAll(): Promise<Product[]> {
    const products = this.productService
      .createQueryBuilder("product")
      .getMany();
    return products;
  }
  async findOne(id: string): Promise<Product> {
    const product = await this.productService
      .createQueryBuilder("product")
      .where("user.id = :id", { id })
      .getOne();
    if (!product) throw new Error();
    return product;
  }

  async create(
    { title, description, imageUrl, price }: ProductInput,
    userId: string
  ): Promise<Product | void> {
    const user = await this.userService
      .createQueryBuilder("user")
      .where("user.id = :id", { id: userId })
      .getOne();
    if (!user) {
      return Errors.UnauthorizedException();
    }
    const product = new Product();

    product.title = title;
    product.description = description;
    product.imageUrl = imageUrl;
    product.price = price;
    product.owner = user;

    await product.save();

    return product;
  }
  async update(
    data: ProductInput,
    productId: string,
    userId: string
  ): Promise<Product | void> {
    const product = await this.productService
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.owner", "user")
      .where("product.id = :id", { id: productId })
      .getOne();

    if (!product) {
      return Errors.NotFoundException();
    }
    if (product.owner.id.toString() != userId.toString()) {
      return Errors.UnauthorizedException();
    }

    product.title = data.title;
    product.description = data.description;
    product.imageUrl = data.imageUrl;
    product.price = data.price;

    await product.save();
    return product;
  }
  async delete(productId: string): Promise<Product | void> {
    const product = await this.productService
      .createQueryBuilder("product")
      .where("product.id = :id", { id: productId })
      .getOne();
    if (!product) {
      return Errors.NotFoundException();
    }
    const productCopy = Object.assign({}, product);
    await this.productService.remove(product);
    return productCopy;
  }
}
