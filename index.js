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
        if (!origin || !allowedOrigins.includes(origin)) {
            console.error("Blocked by CORS:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
        callback(null, true);
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Konfigurasi file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 } // Maks 5MB
}));

app.use(express.static("public"));
app.use(ProductRoute);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}...`);
}).on("error", (err) => {
    console.error("❌ Error starting server:", err.message);
});
