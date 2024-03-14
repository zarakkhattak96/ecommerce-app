import { UserController } from "@web/controllers/users/user.controller";
import { router } from "../product/product.routes";



export const bootstrapUserRoutes = (userController: UserController) => {


  router.post("/users/createAccount", userController.createUser);

  router.post("/users/login", userController.login )

  return router


}
