import express, { Express } from "express";
import cors from "cors";
import pollingService from "./pollingService";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getStocks } from "./controllers/getStocks";
import { getCurrentValue } from "./controllers/getCurrentValue";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());


app.post("/get-stocks", getStocks);
app.get("/get-current-value",getCurrentValue)

app.listen(process.env.PORT , async ()=>{
    // connect to db
    await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);
    // start polling service
    (process.env.STOP_POLLING_SERVICE as string) !== "true" && pollingService();
    console.log("server started")
})
