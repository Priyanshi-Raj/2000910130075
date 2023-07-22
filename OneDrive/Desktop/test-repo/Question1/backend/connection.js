
import connectToMongo from "./database/db.js";
import express from "express";
import cors from "cors";
import Router from "./database/db.js";
const app = express();
app.use(cors());
import dotenv from "dotenv";
dotenv.config({ path: "./backend/config.env" });

connectToMongo();
const port = process.env.PORT;

app.use(express.json());

const trainRoutes = require('./routes/trainroute');
const registerRoutes = require('./routes/registerroute'); 
const authRoutes=require('./routes/auth');
app.use("/api/auth", Router);
app.use('/trains', trainRoutes);
app.use('/register', registerRoutes); 
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});