import { Product } from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        return res.json(response);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const getProductsByTime = async (req, res) => {
    try {
        const response = await Product.findAll({
            order: [['updatedAt', 'ASC']]
        });
        return res.json(response);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const getProductsById = async (req, res) => {
    try {
        const response = await Product.findOne({ where: { id: req.params.id } });
        return res.json(response);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const saveProduct = async (req, res) => {
    if (!req.files) return res.status(400).json({ msg: "No file Uploaded" });

    const { title, deskrip_img, parag_highlight, penulis, editor, ...paragraphs } = req.body;
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.webp'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" });
    if (file.data.length > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    try {
        await file.mv(`./public/images/${fileName}`);
        await Product.create({ name: title, image: fileName, url, deskrip_img, parag_highlight, penulis, editor, ...paragraphs });
        return res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data not found" });

    let fileName = product.image;
    if (req.files) {
        const file = req.files.file;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg', '.webp'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" });
        if (file.data.length > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${product.image}`;
        if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);

        await file.mv(`./public/images/${fileName}`);
    }

    const { title, deskrip_img, parag_highlight, penulis, editor, ...paragraphs } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({ name: title, deskrip_img, parag_highlight, penulis, editor, url, ...paragraphs }, { where: { id: req.params.id } });
        return res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ msg: "Data not found" });

    try {
        const filepath = `./public/images/${product.image}`;
        if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);

        await Product.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};
