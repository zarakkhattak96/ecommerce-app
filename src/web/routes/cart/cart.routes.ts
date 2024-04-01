import { CartController } from "@web/controllers/cart/cart.controller";
import { router } from "../product/product.routes";

export const bootstrapCartRoutes = (cartController: CartController) => {
  router.post("/cart", cartController.addToCart);

  router.get("/cart/:prodInCart", cartController.fetchFromCart);
  return router;
};
