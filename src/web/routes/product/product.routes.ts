import { Router } from 'express';
import { ProductController } from '../../controllers/product/product.controller';

export const router = Router();
export const bootstrapRoutes = (prodController: ProductController): Router => {
  router.post('/products/addProduct', prodController.addProd);

  router.delete('/products/:productId', prodController.removeProd);

  router.get('/products/:prodId', prodController.getProdById);

  router.get('/products/', prodController.getProds);

  router.put('/products/:productId', prodController.updateProds);

  return router;
};
