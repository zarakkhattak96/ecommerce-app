import { NotFoundError } from "@app/app.errors";
import { ProductBaseRepoInterface } from "../../../domain/interfaces/product/product.interface";
import {
  AddProductDto,
  DeleteProductDto,
  GetProdById,
  UpdateProductDto,
} from "../../dto/product/product.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductBaseRepoInterface")
    private readonly productRepo: ProductBaseRepoInterface,
  ) {}

  async addProduct(prodDto: AddProductDto) {
    await this.productRepo.insert(prodDto.addProdDto);

    const fetchProds = await this.productRepo.fetchAll();

    return {
      products: fetchProds,
    };
  }

  async removeProduct(prodDto: DeleteProductDto) {
    const { productId } = prodDto;

    await this.productRepo.delete(productId);

    const fetchProds = await this.productRepo.fetchAll();

    return {
      products: fetchProds,
    };
  }

  async fetchProducts() {
    const products = await this.productRepo.fetchAll();

    return {
      products: products,
    };
  }

  async fetchById(prodDto: GetProdById) {
    const fetchProduct = await this.productRepo.fetch(prodDto.prodId);

    return {
      product: fetchProduct,
    };
  }

  async updateProduct(prodDto: UpdateProductDto) {
    const { productId, prodData } = prodDto;

    return await this.productRepo.update(productId, prodData);
  }
}
