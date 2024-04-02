import { container } from "tsyringe";
import bootstrapDiRegister from "./register/di.register";
import { ProductController } from "@web/controllers/product/product.controller";
import { UserController } from "@web/controllers/users/user.controller";
import { CartController } from "@web/controllers/cart/cart.controller";
import { AuthController } from "@web/controllers/auth/auth.controller";

const bootstrapDi = async () => {
  await bootstrapDiRegister();

  const prodController = container.resolve(ProductController);
  const userController = container.resolve(UserController);
  const cartController = container.resolve(CartController);
  const authController = container.resolve(AuthController);

  return {
    prodController,
    userController,
    cartController,
    authController,
  };
};

export default bootstrapDi;
