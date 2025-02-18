import express from "express";
import {
    getProducts,
    getProductsById,
    saveProduct,
    UpdateProduct,
    deleteProduct,
    getProductsByTime
} from "../controllers/ProductController.js";

import {
    getArtikel,
    getArtikelById,
    saveArtikel,
    UpdateArtikel,
    deleteArtikel,
    getArtikelByTime
} from "../controllers/ArtikelControl.js";

import {
    getPengumuman,
    getPengumumanById,
    savePengumuman,
    UpdatePengumuman,
    deletePengumuman,
    getPengumumanByTime
} from "../controllers/PengumumanControl.js";

import {
    getVideo,
    getVideoById,
    createVideo,
    deleteVideo,
    updateVideo
} from "../controllers/VideoControl.js"

import {
    getUsers, Register, Login, Logout
} from "../controllers/User.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/products', getProducts);
router.get('/productsBytime', getProductsByTime);
router.get('/products/:id', getProductsById);
router.get('/artikel', getArtikel);
router.get('/artikelBytime', getArtikelByTime);
router.get('/artikel/:id', getArtikelById);
router.get('/pengumuman', getPengumuman);
router.get('/PengumumanBytime', getPengumumanByTime);
router.get('/pengumuman/:id', getPengumumanById);
router.post('/products', saveProduct);
router.patch('/products/:id', UpdateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/artikel', saveArtikel);
router.patch('/artikel/:id', UpdateArtikel);
router.delete('/artikel/:id', deleteArtikel);
router.post('/pengumuman', savePengumuman);
router.patch('/pengumuman/:id', UpdatePengumuman);
router.delete('/pengumuman/:id', deletePengumuman);
router.get('/video', getVideo)
router.get('/video/:id', getVideoById)
router.patch('/video/:id', updateVideo);
router.post('/video', createVideo)
router.delete('/video/:id', deleteVideo)
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;