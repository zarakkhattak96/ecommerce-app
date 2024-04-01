import { container } from "tsyringe";
import bootstrapDiRegister from "./register/di.register";
import { ProductController } from "@web/controllers/product/product.controller";
import { UserController } from "@web/controllers/users/user.controller";
import { CartController } from "@web/controllers/cart/cart.controller";

const bootstrapDi = async () => {
  await bootstrapDiRegister();

  const prodController = container.resolve(ProductController);
  const userController = container.resolve(UserController);
  const cartController = container.resolve(CartController);

  return {
    prodController,
    userController,
    cartController,
  };
};

export default bootstrapDi;
