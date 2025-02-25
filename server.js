import * as dotenv from 'dotenv'; // Import the dotenv module
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js'; // The crucial change!
import errorHandler from './middleware/errorMiddleware.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // Call the config method

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request body
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: false }));

// Connect to DB
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port -->  ${PORT}`));
