import { Request, Response } from "express";
import Stock from "../models/Stocks/Stocks.schema";




export const getStocks = async (req: Request, res: Response) => {
    const symbol:string = req.body.symbol;
    const stocksLimit = parseInt(process.env.NUMBER_OF_STOCKS_PER_REQUEST as string) || 20;
    const stocks = await Stock.find({symbol}).limit(stocksLimit).sort({time:-1}).exec();
    res.json(stocks)
};
