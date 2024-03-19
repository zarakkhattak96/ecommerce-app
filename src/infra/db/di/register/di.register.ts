import { AuthService } from '@app/services/auth/auth.service';
import { ProductService } from '@app/services/product/product.service';
import { UserServiceClass } from '@app/services/user/user.service';
import {
  UserBaseRepo,
  //   UserBaseRepoInterface,
} from '@domain/interfaces/user/user.interface';
import { ProductRepositoryClass } from '@infra/db/repositories/product.repositories';
import { UserRepositoryClass } from '@infra/db/repositories/user.repository';
import { JwtServiceProv } from '@infra/jwt';
import { PasswordHashingBcrypt } from '@infra/password-hashing';
import { ProductController } from '@web/controllers/product/product.controller';
import { UserController } from '@web/controllers/users/user.controller';
import { container } from 'tsyringe';

const bootstrapDiRegister = async () => {
  // services
  const authServRegister = container.register<AuthService>('AuthService', {
    useClass: AuthService,
  });

  const productServRegister = container.register<ProductService>(
    'ProductService',
    {
      useClass: ProductService,
    },
  );

  const userServiceRegister = container.register<UserServiceClass>(
    'UserServiceClass',
    {
      useClass: UserServiceClass,
    },
  );

  const passHashingServRegister = container.register<PasswordHashingBcrypt>(
    'PasswordHashingService',
    {
      useClass: PasswordHashingBcrypt,
    },
  );

  const jwtServRegister = container.register<JwtServiceProv>('JwtServiceProv', {
    useClass: JwtServiceProv,
  });

  //   controller

  const authControllerRegister = container.register<UserController>(
    'UserController',
    {
      useClass: UserController,
    },
  );

  const prodControllerRegister = container.register<ProductController>(
    'ProductController',
    {
      useClass: ProductController,
    },
  );

  const userController = container.register<UserController>('UserController', {
    useClass: UserController,
  });

  //   repositories

  const userRepoRegister = container.register<UserRepositoryClass>(
    'UserRepositoryClass',
    {
      useClass: UserRepositoryClass,
    },
  );

  const productRepoRegister = container.register<ProductRepositoryClass>(
    'ProductRepositoryClass',
    {
      useClass: ProductRepositoryClass,
    },
  );

  //   const userBaseRepoInterface = container.register<UserBaseRepoInterface>(
  //     'UserBaseRepoInterface',
  //     {
  //       useClass: UserRepositoryClass,
  //     },
  //   );
  return {
    // services
    authServRegister,
    userServiceRegister,
    productServRegister,
    passHashingServRegister,
    jwtServRegister,

    // controllers

    authControllerRegister,
    prodControllerRegister,
    userController,

    //  repos

    userRepoRegister,
    productRepoRegister,
    // userBaseRepoInterface
  };
};

export default bootstrapDiRegister;
