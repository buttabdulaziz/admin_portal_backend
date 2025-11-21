import { Router } from "express";
import { getProducts } from "../controller/productController.js";
import { postProduct } from "../controller/productController.js";
import { deleteProduct } from "../controller/productController.js";
import { updateProduct } from "../controller/productController.js";
import { getProductById } from "../controller/productController.js";
import { upload } from "../middleware/uploadimg.js";
import { uploadImage } from "../controller/productController.js";
const routes = Router();

routes.get("/", getProducts);
routes.post("/", postProduct);
routes.patch("/:id",deleteProduct);
routes.put("/:id",updateProduct);
routes.get("/:id", getProductById);
routes.post('/uploadImage', upload.single('productImage'),uploadImage)

export default routes;