"use client";
import {
  setStocks,
  getFoo,
  getStocks,
  setSymbol,
  getSymbol,
  setCurrentValue,
  getCurrentValues,
} from "@/lib/features/stocks/stocksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef } from "react";
import styles from "./Stock.module.css";

const axios = require("axios");
var moment = require("moment-timezone");

export default function Stocks() {
  const symbols = [
    { value: "AAPL", label: "Apple" },
    { value: "GOOG", label: "Google" },
    { value: "AMZN", label: "Amazon" },
    { value: "META", label: "Meta" },
    { value: "MSFT", label: "Microsoft" },
  ];
  const foo = useAppSelector(getFoo);
  const stocks = useAppSelector(getStocks);
  const symbol = useAppSelector(getSymbol);
  const currentValues = useAppSelector(getCurrentValues);
  const intervalRef = useRef(null as any);
  const currentValueIntervalRef = useRef(null as any);
  const dispatch = useAppDispatch();
  const indianTime = (currentTime: Date) => {
    const time = moment(currentTime);
    return time.tz("Asia/Kolkata").format("dddd, MMMM Do YYYY, h:mm:ss a");
  };

  const callStocksAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/get-stocks", {
        symbol,
      });
      dispatch(setStocks({ stocks: response.data, symbol: symbol as string }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const callCurrentValuesAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/get-current-value"
      );
      dispatch(setCurrentValue(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (currentValueIntervalRef.current)
      clearInterval(currentValueIntervalRef.current);
    callCurrentValuesAPI();
    currentValueIntervalRef.current = setInterval(callCurrentValuesAPI, 5000);
  }, []);
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    callStocksAPI();
    intervalRef.current = setInterval(callStocksAPI, 5000);
  }, [symbol]);
  const renderStocks = () => {
    return stocks.map(({ currentValue, time }) => (
      <div className={styles.boxShadow}>
        <p style={{ fontWeight: "bolder", color: "black" }}>Stock Price :</p>
        &nbsp;<b style={{ color: "yellow" }}>{currentValue} $</b>
        &nbsp;,{" "}
        <p style={{ fontWeight: "bolder", color: "black" }}>TimeStamp : </p>
        &nbsp; <b style={{ color: "purple" }}>{indianTime(time)}</b>
      </div>
    ));
  };
  return (
    <div className={styles.mainDiv}>
      {symbols.map((symbol) => (
        <button
          key={symbol.value}
          className={styles.button}
          onClick={() => dispatch(setSymbol(symbol.value))}
        >
          {symbol.label}
          &nbsp;: $
          {
            currentValues.filter((currentValue) => {
              return symbol.value === currentValue.symbol;
            })[0]?.currentValue
          }
        </button>
      ))}
      {stocks ? renderStocks() : "empty"}
    </div>
  );
}
