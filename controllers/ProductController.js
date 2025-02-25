import { Product } from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response)
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getProductsByTime = async(req, res) => {
    try {
        const response = await Product.findAll({
            order: [['updatedAt', 'ASC']]
        });
        res.json(response);
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const getProductsById = async(req, res) => {
    try {
        const response = await Product.findOne({
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

export const saveProduct = async(req, res) => {
    if(req.files == null) return res.status(400).json({msg: "No file Uploaded"});
    const name = req.body.title;
    const deskrip_img = req.body.deskrip_img;
    const parag_highlight = req.body.parag_highlight;
    const parag_1 = req.body.parag_1; 
    const parag_2 = req.body.parag_2; 
    const parag_3 = req.body.parag_3; 
    const parag_4 = req.body.parag_4; 
    const parag_5 = req.body.parag_5; 
    const parag_6 = req.body.parag_6; 
    const parag_7 = req.body.parag_7; 
    const parag_8 = req.body.parag_8; 
    const parag_9 = req.body.parag_9; 
    const parag_10 = req.body.parag_10; 
    const parag_11 = req.body.parag_11; 
    const parag_12 = req.body.parag_12; 
    const penulis = req.body.penulis; 
    const editor = req.body.editor; 
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg','.webp'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({name: name, image: fileName, url: url, deskrip_img: deskrip_img, parag_highlight: parag_highlight, parag_1: parag_1, parag_2: parag_2, parag_3: parag_3, parag_4: parag_4, parag_5: parag_5, parag_6: parag_6, parag_7: parag_7, parag_8: parag_8, parag_9: parag_9, parag_10: parag_10, parag_11: parag_11, parag_12: parag_12, penulis: penulis, editor: editor})
            res.status(201).json({msg: "Product Created Succesfuly"});
        } 
        
        catch (error) {
            console.log(error.message)
        }
    })

}


export const UpdateProduct = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!product) return res.status(404).json({msg: "Data not found"});

    let fileName = "";
    if(req.files === null) {
        fileName = product.image;
    }

    else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg','.webp'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${product.image}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const name = req.body.title;
    const deskrip_img = req.body.deskrip_img;
    const parag_highlight = req.body.parag_highlight;
    const parag_1 = req.body.parag_1;
    const parag_2 = req.body.parag_2;
    const parag_3 = req.body.parag_3;
    const parag_4 = req.body.parag_4;
    const parag_5 = req.body.parag_5;
    const parag_6 = req.body.parag_6;
    const parag_7 = req.body.parag_7;
    const parag_8 = req.body.parag_8;
    const parag_9 = req.body.parag_9;
    const parag_10 = req.body.parag_10;
    const parag_11 = req.body.parag_11;
    const parag_12 = req.body.parag_12;
    const penulis = req.body.penulis;
    const editor = req.body.editor;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({name: name, deskrip_img: deskrip_img, parag_highlight: parag_highlight, parag_1: parag_1, parag_2: parag_2, parag_3: parag_3, parag_4: parag_4, parag_5: parag_5, parag_6: parag_6, parag_7: parag_7, parag_8: parag_8, parag_9: parag_9, parag_10: parag_10, parag_11: parag_11, parag_12: parag_12, penulis: penulis, editor: editor, url: url}, {
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

export const deleteProduct = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!product) return res.status(404).json({msg: "Data not found"});

    try {
        const filepath = `./public/images/${product.image}`;
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }
        await Product.destroy({
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

