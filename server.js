import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("combined"));

dbConnect();

app.use("/taskMgmt", taskRoutes);
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected successfully in PORT: ${process.env.PORT}`);
});
