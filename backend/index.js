import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';

dotenv.config(); // No need for empty {}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Test routes
app.get('/', (req, res) => {
  res.send('Root Route Working!');
});

app.get('/home', (req, res) => {
  return res.status(200).json({ message: 'Hello World!', success: true });
  // 🛑 NOTE: your original `success = true;` line after return did nothing
});

// API routes
app.use('/api/v1/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
connectDB(); // Connect to DB first

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
