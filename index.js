import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

// Load environment variables
dotenv.config();

// Validasi jika `.env` gagal dimuat
if (!process.env.PORT) {
    console.error("⚠️  Error: .env file is missing or PORT is not set.");
    process.exit(1);
}

const app = express();

// Middleware CORS - Izinkan localhost & domain Vercel
const allowedOrigins = [
    "http://localhost:3000", 
    "https://your-frontend-domain.vercel.app" // Ganti dengan domain frontend yang sudah dideploy
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy does not allow this origin"), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 // Mengatasi masalah preflight request di beberapa browser
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Menangani preflight requests

// Middleware lainnya
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// Logger sederhana untuk melihat request masuk
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use(ProductRoute);

// Middleware Error Handling
app.use((err, req, res, next) => {
    console.error("⚠️ Error:", err.message);
    res.status(500).json({ message: err.message });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
