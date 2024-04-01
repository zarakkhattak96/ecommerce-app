import { CartController } from "@web/controllers/cart/cart.controller";
import { router } from "../product/product.routes";

export const bootstrapCartRoutes = (cartController: CartController) => {
  router.post("/cart", cartController.addToCart);

  return router;
};
