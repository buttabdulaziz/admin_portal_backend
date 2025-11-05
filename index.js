import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes  from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { verifyToken } from "./middleware/VerifyToken.js";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/products",productRoutes);
app.use("/api/add_product", verifyToken ,productRoutes);
app.use("/api/del_product/", verifyToken , productRoutes);
app.use("/api/update_product/", verifyToken , productRoutes);

app.use("/api/user",userRoutes );
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/cart", cartRoutes);


app.listen(5002, () => console.log("Server is Running"));
