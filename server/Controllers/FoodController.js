import { FoodList, addFoodItem } from "../database/database.js";
import path from 'path';
import multer from "multer";

export const foodList = async (req, res) => {
    try {
        const foods = await FoodList();
        res.status(200).json(foods);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}

//uploading a food item along side with image
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

export const newFoodItem = async (req, res) => {
    const foodImg = req.file.filename;
    const { foodName, foodDesc, price } = req.body;
    try {
        const insertNewFood = await addFoodItem(foodName, foodDesc, price, foodImg)
        // console.log("Img and new food info upload happened well!", insertNewFood);
        res.status(201).json({ Message: "It went well", food: insertNewFood })

    } catch (err) {
        console.log("Diqka shkoi keq:", err);
    }
}




export const UploadImgToDB = async (req, res) => {
    const image = req.file.filename;
    try {
        console.log("Img upload happened well!")
    } catch (err) {
        console.log("Diqka shkoi keq:", err)
    }
}
