import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

dbConnect();

app.use("/taskMgmt", taskRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server Connected successfully in PORT: ${process.env.PORT}`);
});
