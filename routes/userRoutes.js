import { Router } from "express";
import { UserRegister } from "../controller/userController.js";
import { userLogin } from "../controller/userController.js";

const routes = Router();

routes.post("/user-registration", UserRegister);
routes.post("/user-login", userLogin)

export default routes;