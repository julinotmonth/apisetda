import {Sequelize} from "sequelize";

const db = new Sequelize('bhhobmavjrngkbkydgl6','u9h0ifiima73m3tt','YcGhnWsrUYUfsPfvmboe',{
    host: 'bhhobmavjrngkbkydgl6-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

export default db;