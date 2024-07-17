"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "./Counter.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCurrentValues, setCurrentValue, setSymbol } from "@/lib/features/stocks/stocksSlice";
import axios from "axios";

export const Counter = () => {
  const symbols = [
    { value: "AAPL", label: "Apple" },
    { value: "GOOG", label: "Google" },
    { value: "AMZN", label: "Amazon" },
    { value: "META", label: "Meta" },
    { value: "MSFT", label: "Microsoft" },
  ];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentValues = useAppSelector(getCurrentValues);
  const homePageCurrentValueIntervalRef = useRef(null as any);

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
    if (homePageCurrentValueIntervalRef.current)
      clearInterval(homePageCurrentValueIntervalRef.current);
    callCurrentValuesAPI();
    homePageCurrentValueIntervalRef.current = setInterval(
      callCurrentValuesAPI,
      5000
    );
  }, []);

  return (
    <div>
      {symbols.map((symbol) => (
        <button
          key={symbol.value + symbol.label}
          className={styles.homePageButtons}
          onClick={() => {
            router.push("/stocks");
            dispatch(setSymbol(symbol.value));
          }}
        >
          <div className={styles.homePageStockCard}>
            <p style={{ color: "rebeccapurple" }}>{symbol.label}</p>
            <br />
            <p>
              &nbsp;:&nbsp;$
              {
                currentValues.filter((currentValue) => {
                  return symbol.value === currentValue.symbol;
                })[0]?.currentValue
              }
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
