import {Sequelize} from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize('bhhobmavjrngkbkydgl6','u9h0ifiima73m3tt','YcGhnWsrUYUfsPfvmboe',{
    host: 'bhhobmavjrngkbkydgl6-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2
});

export default db;