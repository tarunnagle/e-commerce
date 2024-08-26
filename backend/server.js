import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

app.use("./api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();

    app.use("/uploads", express.static("/var/data/uploads"));
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
} else {
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    app.get("/", (req, res) => {
        res.send("the server has started running...");
    })
}

app.listen(port, () => {
    console.log(`the servers has been started on ${port}`);
})