import { container } from "tsyringe";
import bootstrapDiRegister from "./register/di.register";
import { ProductController } from "@web/controllers/product/product.controller";
import { UserController } from "@web/controllers/users/user.controller";

const bootstrapDi = async () => {
  await bootstrapDiRegister();

  //   resolving services
  //
  // const userRepo = container.resolve<UserBaseRepoInterface>(
  //   'UserBaseRepoInterface',
  // );
  // const prodRepo = container.resolve(ProductRepositoryClass);
  // const userServ = container.resolve(UserServiceClass);
  // const prodServ = container.resolve(ProductService);
  const prodController = container.resolve(ProductController);
  const userController = container.resolve(UserController);
  // const userBaseRepo = container.resolve(Repository<UserModel>);

  // const prodRepo = container.resolve(ProductRepositoryClass);
  // const userRepo = container.resolve(UserRepositoryClass);

  // jwt and passhashing to be resolved

  return {
    prodController,
    userController,
    // userServ,
    // prodServ,
    // prodRepo,
    // userRepo,
    // userBaseRepo,
  };
};

export default bootstrapDi;
