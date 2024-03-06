import { Router } from 'express';
import { ProductController } from '../../controllers/product/product.controller';

export const bootstrapRoutes = (prodController: ProductController): Router => {
  const router = Router();

  router.post('/addProduct', prodController.addProd);

  router.delete('/:productId', prodController.removeProd);

  return router;
};
