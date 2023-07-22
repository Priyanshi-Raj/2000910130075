
import connectToMongo from "./database/db.js";
import express from "express";
import cors from "cors";
import Router from "./database/db.js";
import trainRoutes from './routes/trainroute';
import registerRoutes from './routes/registerroute';
import authRoutes from './routes/auth';

const app = express();
app.use(cors());
import dotenv from "dotenv";
dotenv.config({ path: "./backend/config.env" });

connectToMongo();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/auth", Router);
app.use('/trains', trainRoutes);
app.use('/register', registerRoutes); 
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});