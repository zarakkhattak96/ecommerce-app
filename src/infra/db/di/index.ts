import { container } from 'tsyringe';
import bootstrapDiRegister from './register/di.register';
import { AuthService } from '@app/services/auth/auth.service';
import { UserServiceClass } from '@app/services/user/user.service';
import { ProductService } from '@app/services/product/product.service';
import { PasswordHashingBcrypt } from '@infra/password-hashing';
import { JwtServiceProv } from '@infra/jwt';
import { UserController } from '@web/controllers/users/user.controller';
import { ProductController } from '@web/controllers/product/product.controller';
import { UserRepositoryClass } from '../repositories/user.repository';
import { ProductRepositoryClass } from '../repositories/product.repositories';

const bootstrapDi = async () => {
  await bootstrapDiRegister();

  //   resolving services
  const authServ = container.resolve(AuthService);
  const userServ = container.resolve(UserServiceClass);
  const prodServ = container.resolve(ProductService);
  const passServ = container.resolve(PasswordHashingBcrypt);
  const jwtServ = container.resolve(JwtServiceProv);

  //   resolving controllers

  //   const authController = container.resolve(UserController);
  const userController = container.resolve(UserController);
  const prodController = container.resolve(ProductController);

  //   resolving repos

  const userRepo = container.resolve(UserRepositoryClass);
  const prodRepo = container.resolve(ProductRepositoryClass);
  //   const userBaseRepoInterface = container.resolve(UserRepositoryClass)

  return {
    // services
    authServ,
    userServ,
    prodServ,
    passServ,
    jwtServ,

    // controllers
    // authController,
    userController,
    prodController,

    // repos
    userRepo,
    prodRepo,
    // userBaseRepoInterface
  };
};

export default bootstrapDi;
