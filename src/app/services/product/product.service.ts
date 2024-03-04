import { ProductRepository } from '../../../infra/db/repositories/product.repositories';
import { AddProductDto } from '../../dto/product/product.dto';

export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async addProduct(prodDto: AddProductDto) {
    const addProd = await this.productRepo.insert(prodDto.addProdDto);
    return addProd;
  }
}
