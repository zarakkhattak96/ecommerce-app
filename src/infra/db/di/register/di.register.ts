import { AuthService } from "@app/services/auth/auth.service";
import { JwtService } from "@app/services/jwt.service";
import { PasswordHashingService } from "@app/services/password-hashing.service";
import { ProductService } from "@app/services/product/product.service";
import { UserServiceClass } from "@app/services/user/user.service";
import { ProductBaseRepoInterface } from "@domain/interfaces/product/product.interface";
import { AuthRepositoryClass } from "@infra/db/repositories/auth.repository";
import { ProductRepositoryClass } from "@infra/db/repositories/product.repositories";
import { UserRepositoryClass } from "@infra/db/repositories/user.repository";
import { JwtServiceProv } from "@infra/jwt";
import { PasswordHashingBcrypt } from "@infra/password-hashing";
import { container } from "tsyringe";

const bootstrapDiRegister = async () => {
  const userRepoInterface = container.register("UserBaseRepoInterface", {
    useClass: UserRepositoryClass,
  });

  const prodRepoInterface = container.register<ProductBaseRepoInterface>(
    "ProductBaseRepoInterface",
    { useClass: ProductRepositoryClass },
  );
  const authRepo = container.register<AuthRepositoryClass>("AuthRepoClass", {
    useClass: AuthRepositoryClass,
  });

  const prodRepo = container.register<ProductBaseRepoInterface>(
    "ProductBaseRepoInterface",
    ProductRepositoryClass,
  );

  const userServ = container.register<UserServiceClass>("UserServiceClass", {
    useClass: UserServiceClass,
  });

  const prodServ = container.register<ProductService>("ProductService", {
    useClass: ProductService,
  });

  const passHashServ = container.register<PasswordHashingService>(
    "PasswordHashingBcrypt",
    { useClass: PasswordHashingBcrypt },
  );

  const jwtServ = container.register<JwtService>("JwtService", {
    useClass: JwtServiceProv,
  });

  const authServ = container.register<AuthService>("AuthService", {
    useClass: AuthService,
  });

  //TODO: To add cart routes

  return {
    prodRepoInterface,
    authRepo,
    authServ,
    passHashServ,
    jwtServ,
    userServ,
    prodServ,
    prodRepo,
  };
};

export default bootstrapDiRegister;
