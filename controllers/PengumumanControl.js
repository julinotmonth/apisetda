import { Pengumuman } from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getPengumuman = async(req, res) => {
    try {
        const response = await Pengumuman.findAll();
        res.json(response)
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getPengumumanByTime = async(req, res) => {
    try {
        const response = await Pengumuman.findAll({
            order: [['updatedAt', 'ASC']]
        });
        res.json(response);
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getPengumumanById = async(req, res) => {
    try {
        const response = await Pengumuman.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const savePengumuman = async(req, res) => {
    if(req.files == null) return res.status(400).json({msg: "No file Uploaded"});
    const name_pengumuman = req.body.title;
    const deskrip_img_pengumuman = req.body.deskrip_img_pengumuman;
    const parag_highlight_pengumuman = req.body.parag_highlight_pengumuman;
    const parag_1_pengumuman = req.body.parag_1_pengumuman; 
    const parag_2_pengumuman = req.body.parag_2_pengumuman; 
    const parag_3_pengumuman = req.body.parag_3_pengumuman; 
    const parag_4_pengumuman = req.body.parag_4_pengumuman; 
    const parag_5_pengumuman = req.body.parag_5_pengumuman; 
    const parag_6_pengumuman = req.body.parag_6_pengumuman; 
    const parag_7_pengumuman = req.body.parag_7_pengumuman; 
    const parag_8_pengumuman = req.body.parag_8_pengumuman; 
    const parag_9_pengumuman = req.body.parag_9_pengumuman; 
    const parag_10_pengumuman = req.body.parag_10_pengumuman; 
    const parag_11_pengumuman = req.body.parag_11_pengumuman; 
    const parag_12_pengumuman = req.body.parag_12_pengumuman; 
    const penulis_pengumuman = req.body.penulis_pengumuman; 
    const editor_pengumuman = req.body.editor_pengumuman; 
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url_pengumuman = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg','.webp'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Pengumuman.create({name_pengumuman: name_pengumuman, image_pengumuman: fileName, url_pengumuman: url_pengumuman, deskrip_img_pengumuman: deskrip_img_pengumuman, parag_highlight_pengumuman: parag_highlight_pengumuman, parag_1_pengumuman: parag_1_pengumuman, parag_2_pengumuman: parag_2_pengumuman, parag_3_pengumuman: parag_3_pengumuman, parag_4_pengumuman: parag_4_pengumuman, parag_5_pengumuman: parag_5_pengumuman, parag_6_pengumuman: parag_6_pengumuman, parag_7_pengumuman: parag_7_pengumuman, parag_8_pengumuman: parag_8_pengumuman, parag_9_pengumuman: parag_9_pengumuman, parag_10_pengumuman: parag_10_pengumuman, parag_11_pengumuman: parag_11_pengumuman, parag_12_pengumuman: parag_12_pengumuman, penulis_pengumuman: penulis_pengumuman, editor_pengumuman: editor_pengumuman})
            res.status(201).json({msg: "Product Created Succesfuly"});
        } 
        
        catch (error) {
            console.log(error.message)
        }
    })

}


export const UpdatePengumuman = async(req, res) => {
    const pengumuman = await Pengumuman.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!pengumuman) return res.status(404).json({msg: "Data not found"});

    let fileName = "";
    if(req.files === null) {
        fileName = pengumuman.image_pengumuman;
    }

    else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg','.webp'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${pengumuman.image_pengumuman}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const name_pengumuman = req.body.title;
    const deskrip_img_pengumuman = req.body.deskrip_img_pengumuman;
    const parag_highlight_pengumuman = req.body.parag_highlight_pengumuman;
    const parag_1_pengumuman = req.body.parag_1_pengumuman;
    const parag_2_pengumuman = req.body.parag_2_pengumuman;
    const parag_3_pengumuman = req.body.parag_3_pengumuman;
    const parag_4_pengumuman = req.body.parag_4_pengumuman;
    const parag_5_pengumuman = req.body.parag_5_pengumuman;
    const parag_6_pengumuman = req.body.parag_6_pengumuman;
    const parag_7_pengumuman = req.body.parag_7_pengumuman;
    const parag_8_pengumuman = req.body.parag_8_pengumuman;
    const parag_9_pengumuman = req.body.parag_9_pengumuman;
    const parag_10_pengumuman = req.body.parag_10_pengumuman;
    const parag_11_pengumuman = req.body.parag_11_pengumuman;
    const parag_12_pengumuman = req.body.parag_12_pengumuman;
    const penulis_pengumuman = req.body.penulis_pengumuman;
    const editor_pengumuman = req.body.editor_pengumuman;
    const url_pengumuman = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Pengumuman.update({name_pengumuman: name_pengumuman, deskrip_img_pengumuman: deskrip_img_pengumuman, parag_highlight_pengumuman: parag_highlight_pengumuman, parag_1_pengumuman: parag_1_pengumuman, parag_2_pengumuman: parag_2_pengumuman, parag_3_pengumuman: parag_3_pengumuman, parag_4_pengumuman: parag_4_pengumuman, parag_5_pengumuman: parag_5_pengumuman, parag_6_pengumuman: parag_6_pengumuman, parag_7_pengumuman: parag_7_pengumuman, parag_8_pengumuman: parag_8_pengumuman, parag_9_pengumuman: parag_9_pengumuman, parag_10_pengumuman: parag_10_pengumuman, parag_11_pengumuman: parag_11_pengumuman, parag_12_pengumuman: parag_12_pengumuman, penulis_pengumuman: penulis_pengumuman, editor_pengumuman: editor_pengumuman, url_pengumuman: url_pengumuman}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated Succesfuly"});
    } 
    catch (error) {
        console.log(error.message);
    }
}

export const deletePengumuman = async(req, res) => {
    const pengumuman = await Pengumuman.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!pengumuman) return res.status(404).json({msg: "Data not found"});

    try {
        const filepath = `./public/images/${pengumuman.image_pengumuman}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }
        await Pengumuman.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Succesfuly"})
    } 
    
    catch (error) {
        console.log(error.message);
    }
}