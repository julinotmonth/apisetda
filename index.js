import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();

const app = express();

// Middleware CORS - Izinkan localhost & domain Vercel
const allowedOrigins = [
    "http://localhost:3000", 
    "https://your-frontend-domain.vercel.app" // Ganti dengan domain frontend yang sudah dideploy
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
