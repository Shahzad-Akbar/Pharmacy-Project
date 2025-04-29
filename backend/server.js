import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './config/connectMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});