import { container } from "tsyringe";
import bootstrapDiRegister from "./register/di.register";
import { ProductController } from "@web/controllers/product/product.controller";
import { UserController } from "@web/controllers/users/user.controller";

const bootstrapDi = async () => {
  await bootstrapDiRegister();

  const prodController = container.resolve(ProductController);
  const userController = container.resolve(UserController);

  //TODO: resolve cart controller

  return {
    prodController,
    userController,
  };
};

export default bootstrapDi;
