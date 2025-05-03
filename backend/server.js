import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './config/connectMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});