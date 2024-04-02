import { AuthController } from "@web/controllers/auth/auth.controller";
import { router } from "../product/product.routes";

export const bootstrapAuthRoutes = (authController: AuthController) => {
  router.post("/auth/login", authController.login);
  router.delete("/auth/logout", authController.logout);
  return router;
};
