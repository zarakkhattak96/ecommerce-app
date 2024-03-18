import { ProductRepositoryClass } from '../../repositories/product.repositories';
import { ProductService } from '../../../../app/services/product/product.service';
import { ProductController } from '../../../../web/controllers/product/product.controller';
import ds from '../../../config/connection.config';
import { ProductModel } from '../../models/product/product.model';
import { UserRepositoryClass } from '@infra/db/repositories/user.repository';
import { UserModel } from '@infra/db/models/user/user.model';
import { UserServiceClass } from '@app/services/user/user.service';
import { UserController } from '@web/controllers/users/user.controller';
import { PasswordHashingBcrypt } from '@infra/password-hashing';
import { AuthService } from '@app/services/auth/auth.service';
import { AuthRepositoryClass } from '@infra/db/repositories/auth.repository';
// import { AuthController } from '@web/controllers/auth/auth.controller';
// import { AuthRepositoryClass } from '@infra/db/repositories/auth.repository';
// import { UserModel } from '@infra/db/models/user/user.model';
// import { AuthService } from '@app/services/auth/auth.service';

export const bootstrapDi = () => {
  // prod
  const prodRepo: ProductRepositoryClass = new ProductRepositoryClass(
    ds.getRepository(ProductModel),
  );
  const prodServ: ProductService = new ProductService(prodRepo);
  const prodController: ProductController = new ProductController(prodServ);

  // user
  const userRepo: UserRepositoryClass = new UserRepositoryClass(
    ds.getRepository(UserModel),
  );

  const passServ: PasswordHashingBcrypt = new PasswordHashingBcrypt(); //TODO: confirm this, are all the classes initialized here in the bootstrapDi?

  const authRepo: AuthRepositoryClass = new AuthRepositoryClass(
    ds.getRepository(UserModel),
  );

  const authServ: AuthService = new AuthService(passServ, authRepo);

  const userServ: UserServiceClass = new UserServiceClass(userRepo, passServ);

  const userController: UserController = new UserController(userServ, authServ);
  // const authServ: AuthService = new AuthService(authRepo);

  // const authController: AuthController = new AuthController(authServ);

  return {
    prodRepo,
    prodServ,
    prodController,
    userRepo,
    userServ,
    userController,
    //   authRepo,
    //   authServ,
    //   authController,
  };
};
