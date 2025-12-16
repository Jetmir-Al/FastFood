import express from 'express';
import { UploadImgToDB, upload } from "../Controllers/ImgController.js";


const router = express.Router();

router.post('/uploadImg', upload.single('foodImg'), UploadImgToDB);

export default router;