import { Request, Response } from "express";
import Stock from "../models/Stocks/Stocks.schema";

export const getCurrentValue = async (req: Request, res: Response) => {
  const symbols: Array<string> = (process.env.SYMBOLS as string)?.split(" ");
  const stocks = await Promise.all(
    symbols.map((symbol) => Stock.findOne({ symbol }).sort({ time: -1 }))
  );
  res.json(
    stocks.map((stock, index) => {
      return { symbol: symbols[index], currentValue: stock?.currentValue };
    })
  );
};
