const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use('/api/cart', cartRoutes);

app.use('/api/users', userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.get('/', (req, res) => res.send("Server is working..."));

app.use(errorMiddleware);

module.exports = app;
