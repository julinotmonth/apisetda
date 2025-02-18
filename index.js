import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/ProductRoute.js";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
dotenv.config();

const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute)

app.listen(5000, () => console.log('Server Up and Running...'));

