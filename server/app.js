const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";

app.use('/api/cart', cartRoutes);

app.use('/api/users', userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send("Server is working..."));

app.use(errorMiddleware);

module.exports = app;