import { ProductRepository } from '../../../infra/db/repositories/product.repositories';
import { AddProductDto, DeleteProductDto } from '../../dto/product/product.dto';

export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async addProduct(prodDto: AddProductDto) {
    const addProd = await this.productRepo.insert(prodDto.addProdDto);
    return addProd;
  }

  async removeProduct(prodDto: DeleteProductDto) {
    const { productId } = prodDto;

    const removeProduct = await this.productRepo.delete(productId);

    return removeProduct;
  }
}
