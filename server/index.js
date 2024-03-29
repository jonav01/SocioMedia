import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.controller.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { createDirectory } from "./utils/createDirectory.js";
// Configurations
const __filename = fileURLToPath(import.meta.url); // ensures cross-platform absolute path
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

app.use(helmet()); // setup for security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // HTTP request logger
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // serving static assets files

// File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.post("/auth/register", createDirectory, upload.single("picture"), register);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// Mongoose setup
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect `));
