import { UserController } from "@web/controllers/users/user.controller";
import { router } from "../product/product.routes";

export const bootstrapUserRoutes = (userController: UserController) => {
  router.post("/users/createAccount", userController.createUser);

  router.get("/users/", userController.fetchAllUsers);

  router.get("/users/:userId", userController.fetchUserById);

  router.put("/users/:userId", userController.updateUser);

  router.delete("/users/:userId", userController.deleteUser);
  return router;
};
