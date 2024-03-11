import { Router } from 'express';
import { ProductController } from '../../controllers/product/product.controller';

export const bootstrapRoutes = (prodController: ProductController): Router => {
  const router = Router();

  router.post('/addProduct', prodController.addProd);

  router.delete('/:productId', prodController.removeProd);

  router.get('/:prodId', prodController.getProdById);

  router.get('/', prodController.getProds);

  router.put('/:productId', prodController.updateProds);

  return router;
};
