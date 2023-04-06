import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./Routes/authRoute.mjs";

//configure env
dotenv.config({ path: "./config/config.env" });

//database connect
connectDB();
// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.listen(process.env.PORT, () => {
  console.log(`server is running on port no.${process.env.PORT}`);
});
