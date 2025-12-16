import path from 'path';
import multer from "multer";
import { UploadImg } from '../database/database.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueName = path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});


export const upload = multer({
    storage: storage
})

export const UploadImgToDB = async (req, res) => {
    const image = req.file.filename;
    try {
        const imgUpload = await UploadImg(image);
        console.log("Img upload happened well!")
        res.json(imgUpload);
    } catch (err) {
        console.log("Diqka shkoi keq:", err)
    }
}
