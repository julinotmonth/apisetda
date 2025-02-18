import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME, // Nama database
    process.env.DB_USER, // Username database
    process.env.DB_PASSWORD, // Password database
    {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "mysql",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        logging: false, // Matikan logging jika tidak diperlukan
    }
);

export default db;
