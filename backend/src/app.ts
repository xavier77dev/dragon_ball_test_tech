import express, { Application } from 'express';
import connectDB from './config/dbConfig';
import characterRoutes from './routes/characterRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDB();

app.use('/api/auth', authRoutes);

app.use('/api/characters', characterRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
