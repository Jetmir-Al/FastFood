// import dotenv from "dotenv";
// dotenv.config();
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ImgRoutes from './routes/ImgRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import UpdateRoutes from './routes/UpdateRoutes.js'
import DeliveryRoutes from './routes/DeliveryRoutes.js'
import FoodRoutes from './routes/FoodRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

const app = express();
// get requests from front end
const corsOptions = {
    origin: process.env.CLIENT_PORT,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(express.static('public'));


app.use('/api/auth', AuthRoutes);
app.use('/api/update', UpdateRoutes);
app.use('/api/delivery', DeliveryRoutes);
app.use('/api/img', ImgRoutes);
app.use('/api/food', FoodRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/user', UserRoutes);



app.listen(process.env.SERVER_PORT, () => {
    console.log("Server started on port ", process.env.SERVER_PORT);
});