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
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
}));

// Tambahkan middleware untuk menangani preflight request (CORS OPTIONS)
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
