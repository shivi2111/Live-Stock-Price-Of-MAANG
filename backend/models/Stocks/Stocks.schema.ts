import { Schema, Types, model } from "mongoose";
import IStock from "./Stock.interface";

const StocksSchema = new Schema<IStock>({
  time: { type: Date, required: true },
  symbol: { type: String, required: true },
  currentValue: { type: Number, required: true },
});

export default model('Stocks',StocksSchema);
