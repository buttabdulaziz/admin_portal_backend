import express from "express";
import "dotenv/config";


import productRoutes from "./routes/productRoutes.js";
import userRoutes  from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { verifyToken } from "./middleware/verifyToken.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/products",productRoutes);
app.use("/api/add_product", verifyToken ,productRoutes);
app.use("/api/del_product/", verifyToken , productRoutes);
app.use("/api/update_product/", verifyToken , productRoutes);

app.use("/api/user",verifyToken,userRoutes );
app.use("/api/user",verifyToken ,userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/add_cart", cartRoutes);
app.use("/api/get_cart", cartRoutes);


app.listen(PORT, () => console.log("Server is Running"));
