import { ProductRepositoryClass } from '../../repositories/product.repositories';
import { ProductService } from '../../../../app/services/product/product.service';
import { ProductController } from '../../../../web/controllers/product/product.controller';
import ds from '../../../config/connection.config';
import { ProductModel } from '../../models/product/product.model';

export const bootstrapDi = () => {
  const prodRepo: ProductRepositoryClass = new ProductRepositoryClass(
    ds.getRepository(ProductModel),
  );
  const prodServ: ProductService = new ProductService(prodRepo);
  const prodController: ProductController = new ProductController(prodServ);

  return { prodRepo, prodServ, prodController };
};
