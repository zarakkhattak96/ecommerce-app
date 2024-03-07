import { ProductBaseRepo } from '../../../domain/interfaces/product/product.interface';
import { AddProductDto, DeleteProductDto } from '../../dto/product/product.dto';

export class ProductService {
  constructor(private readonly productRepo: ProductBaseRepo) {}

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
}
