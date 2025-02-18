import { Video } from "../models/ProductModel.js";

export const getVideo = async(req, res) => {
    try {
        const response = await Video.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const getVideoById = async(req, res) => {
    try {
        const response = await Video.findOne({
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

export const createVideo = async(req, res) =>{
    try {
        await Video.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await Video.findOne({
            where: { id }
        });

        if (!video) {
            return res.status(404).json({ msg: "Video not found" });
        }

        await Video.destroy({
            where: { id }
        });

        res.json({ msg: "Video deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Failed to delete video" });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await Video.findOne({
            where: { id }
        });

        if (!video) {
            return res.status(404).json({ msg: "Video not found" });
        }

        await Video.update(req.body, {
            where: { id }
        });

        res.json({ msg: "Video updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Failed to update video" });
    }
};