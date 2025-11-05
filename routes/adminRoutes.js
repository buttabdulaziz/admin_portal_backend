import { Router } from "express";
import { postAdmin } from "../controller/adminController.js";

const routes = Router();

routes.post("/", postAdmin);

export default routes;