import { ProductRepository } from '../../repositories/product.repositories';
import { ProductService } from '../../../../app/services/product/product.service';
import { ProductController } from '../../../../web/controllers/product/product.controller';

export const bootstrapDi = () => {
  const prodRepo: ProductRepository = new ProductRepository();
  const prodServ: ProductService = new ProductService(prodRepo);
  const prodController: ProductController = new ProductController(prodServ);

  return { prodRepo, prodServ, prodController };
};
