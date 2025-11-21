import express from "express";
import { addCartItems, getCartItems} from "../controller/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addCartItems);
router.get("/get", verifyToken, getCartItems);


export default router;
