import { Artikel } from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getArtikel = async(req, res) => {
    try {
        const response = await Artikel.findAll();
        res.json(response)
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getArtikelByTime = async(req, res) => {
    try {
        const response = await Artikel.findAll({
            order: [['updatedAt', 'ASC']]
        });
        res.json(response);
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getArtikelById = async(req, res) => {
    try {
        const response = await Artikel.findOne({
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

export const saveArtikel = async(req, res) => {
    if(req.files == null) return res.status(400).json({msg: "No file Uploaded"});
    const name_artikel = req.body.title;
    const deskrip_img_artikel = req.body.deskrip_img_artikel;
    const parag_highlight_artikel = req.body.parag_highlight_artikel;
    const parag_1_artikel = req.body.parag_1_artikel; 
    const parag_2_artikel = req.body.parag_2_artikel; 
    const parag_3_artikel = req.body.parag_3_artikel; 
    const parag_4_artikel = req.body.parag_4_artikel; 
    const parag_5_artikel = req.body.parag_5_artikel; 
    const parag_6_artikel = req.body.parag_6_artikel; 
    const parag_7_artikel = req.body.parag_7_artikel; 
    const parag_8_artikel = req.body.parag_8_artikel; 
    const parag_9_artikel = req.body.parag_9_artikel; 
    const parag_10_artikel = req.body.parag_10_artikel; 
    const parag_11_artikel = req.body.parag_11_artikel; 
    const parag_12_artikel = req.body.parag_12_artikel; 
    const penulis_artikel = req.body.penulis_artikel; 
    const editor_artikel = req.body.editor_artikel; 
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url_artikel = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg','.webp'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Artikel.create({name_artikel: name_artikel, image_artikel: fileName, url_artikel: url_artikel, deskrip_img_artikel: deskrip_img_artikel, parag_highlight_artikel: parag_highlight_artikel, parag_1_artikel: parag_1_artikel, parag_2_artikel: parag_2_artikel, parag_3_artikel: parag_3_artikel, parag_4_artikel: parag_4_artikel, parag_5_artikel: parag_5_artikel, parag_6_artikel: parag_6_artikel, parag_7_artikel: parag_7_artikel, parag_8_artikel: parag_8_artikel, parag_9_artikel: parag_9_artikel, parag_10_artikel: parag_10_artikel, parag_11_artikel: parag_11_artikel, parag_12_artikel: parag_12_artikel, penulis_artikel: penulis_artikel, editor_artikel: editor_artikel})
            res.status(201).json({msg: "Product Created Succesfuly"});
        } 
        
        catch (error) {
            console.log(error.message)
        }
    })

}


export const UpdateArtikel = async(req, res) => {
    const artikel = await Artikel.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!artikel) return res.status(404).json({msg: "Data not found"});

    let fileName = "";
    if(req.files === null) {
        fileName = artikel.image_artikel;
    }

    else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg','.webp'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${artikel.image_artikel}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const name_artikel = req.body.title;
    const deskrip_img_artikel = req.body.deskrip_img_artikel;
    const parag_highlight_artikel = req.body.parag_highlight_artikel;
    const parag_1_artikel = req.body.parag_1_artikel;
    const parag_2_artikel = req.body.parag_2_artikel;
    const parag_3_artikel = req.body.parag_3_artikel;
    const parag_4_artikel = req.body.parag_4_artikel;
    const parag_5_artikel = req.body.parag_5_artikel;
    const parag_6_artikel = req.body.parag_6_artikel;
    const parag_7_artikel = req.body.parag_7_artikel;
    const parag_8_artikel = req.body.parag_8_artikel;
    const parag_9_artikel = req.body.parag_9_artikel;
    const parag_10_artikel = req.body.parag_10_artikel;
    const parag_11_artikel = req.body.parag_11_artikel;
    const parag_12_artikel = req.body.parag_12_artikel;
    const penulis_artikel = req.body.penulis_artikel;
    const editor_artikel = req.body.editor_artikel;
    const url_artikel = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Artikel.update({name_artikel: name_artikel, deskrip_img_artikel: deskrip_img_artikel, parag_highlight_artikel: parag_highlight_artikel, parag_1_artikel: parag_1_artikel, parag_2_artikel: parag_2_artikel, parag_3_artikel: parag_3_artikel, parag_4_artikel: parag_4_artikel, parag_5_artikel: parag_5_artikel, parag_6_artikel: parag_6_artikel, parag_7_artikel: parag_7_artikel, parag_8_artikel: parag_8_artikel, parag_9_artikel: parag_9_artikel, parag_10_artikel: parag_10_artikel, parag_11_artikel: parag_11_artikel, parag_12_artikel: parag_12_artikel, penulis_artikel: penulis_artikel, editor_artikel: editor_artikel, url_artikel: url_artikel}, {
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

export const deleteArtikel = async(req, res) => {
    const artikel = await Artikel.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!artikel) return res.status(404).json({msg: "Data not found"});

    try {
        const filepath = `./public/images/${artikel.image_artikel}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }
        await Artikel.destroy({
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