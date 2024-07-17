import axios, { Axios, AxiosResponse } from "axios";
import mongoose from "mongoose";
import Stock from "./models/Stocks/Stocks.schema";
import { exit } from "process";

const callApi = async (symbol: string) => {
  const url = (process.env.API_URL as string)
    .replace("<TOKEN>", process.env.TOKEN as string)
    .replace("<SYMBOL>", symbol);
  const resp = await axios.get(url);
  await saveStock(symbol, resp);
};

const saveStock = async (symbol: string, stockResponse: AxiosResponse) => {
  const currentValue: string = stockResponse.data.c;
  const stock = new Stock({
    time: new Date(),
    symbol,
    currentValue,
  });
  await stock.save();
};

export default async () => {
  const symbols = (process.env.SYMBOLS as string).split(" ");
  symbols.forEach((symbol) =>
    setInterval(
      () => callApi(symbol),
      parseInt(process.env.POLLING_INTERVAL as string)
    )
  );
  
};
