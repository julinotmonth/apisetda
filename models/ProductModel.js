import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('berita', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    deskrip_img: DataTypes.STRING,
    parag_highlight: DataTypes.STRING,
    parag_1: DataTypes.STRING,
    parag_2: DataTypes.STRING,
    parag_3: DataTypes.STRING,
    parag_4: DataTypes.STRING,
    parag_5: DataTypes.STRING,
    parag_6: DataTypes.STRING,
    parag_7: DataTypes.STRING,
    parag_8: DataTypes.STRING,
    parag_9: DataTypes.STRING,
    parag_10: DataTypes.STRING,
    parag_11: DataTypes.STRING,
    parag_12: DataTypes.STRING,
    penulis: DataTypes.STRING,
    editor: DataTypes.STRING,
}, {
    freezeTableName: true
});

const Artikel = db.define('artikell', {
    name_artikel: DataTypes.STRING,
    url_artikel: DataTypes.STRING,
    image_artikel: DataTypes.STRING,
    deskrip_img_artikel: DataTypes.STRING,
    parag_highlight_artikel: DataTypes.STRING,
    parag_1_artikel: DataTypes.STRING,
    parag_2_artikel: DataTypes.STRING,
    parag_3_artikel: DataTypes.STRING,
    parag_4_artikel: DataTypes.STRING,
    parag_5_artikel: DataTypes.STRING,
    parag_6_artikel: DataTypes.STRING,
    parag_7_artikel: DataTypes.STRING,
    parag_8_artikel: DataTypes.STRING,
    parag_9_artikel: DataTypes.STRING,
    parag_10_artikel: DataTypes.STRING,
    parag_11_artikel: DataTypes.STRING,
    parag_12_artikel: DataTypes.STRING,
    penulis_artikel: DataTypes.STRING,
    editor_artikel: DataTypes.STRING,
}, {
    freezeTableName: true
});

const Pengumuman = db.define('pengumuman', {
    name_pengumuman: DataTypes.STRING,
    url_pengumuman: DataTypes.STRING,
    image_pengumuman: DataTypes.STRING,
    deskrip_img_pengumuman: DataTypes.STRING,
    parag_highlight_pengumuman: DataTypes.STRING,
    parag_1_pengumuman: DataTypes.STRING,
    parag_2_pengumuman: DataTypes.STRING,
    parag_3_pengumuman: DataTypes.STRING,
    parag_4_pengumuman: DataTypes.STRING,
    parag_5_pengumuman: DataTypes.STRING,
    parag_6_pengumuman: DataTypes.STRING,
    parag_7_pengumuman: DataTypes.STRING,
    parag_8_pengumuman: DataTypes.STRING,
    parag_9_pengumuman: DataTypes.STRING,
    parag_10_pengumuman: DataTypes.STRING,
    parag_11_pengumuman: DataTypes.STRING,
    parag_12_pengumuman: DataTypes.STRING,
    penulis_pengumuman: DataTypes.STRING,
    editor_pengumuman: DataTypes.STRING,
}, {
    freezeTableName: true
});

const Users = db.define('userss',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

const Video = db.define('video', {
    link:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});


export { Product, Artikel, Pengumuman, Users, Video };

(async()=>{
    await db.sync();
})();