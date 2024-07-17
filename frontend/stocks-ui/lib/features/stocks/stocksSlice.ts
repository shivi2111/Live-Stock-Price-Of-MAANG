import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";

export interface StocksSliceState {
  foo: String;
  stocks: any;
  symbol: String;
  currentValues: Array<{ symbol: string; currentValue: number }>;
}

const initialState: StocksSliceState = {
  foo: "bar",
  stocks: {},
  symbol: "AMZN",
  currentValues: [],
};

export const stocksSlice = createAppSlice({
  name: "stocks",
  initialState,
  reducers: (create) => ({
    setStocks: create.reducer(
      (
        state,
        action: PayloadAction<{ symbol: string; stocks: Array<object> }>
      ) => {
        const { symbol, stocks } = action.payload;
        state.stocks[symbol] = stocks;
        return state;
      }
    ),
    setSymbol: create.reducer((state, action: PayloadAction<String>) => {
      state.symbol = action.payload;
      return state;
    }),
    setCurrentValue: create.reducer(
      (
        state,
        action: PayloadAction<Array<{ symbol: string; currentValue: number }>>
      ) => {
        state.currentValues = action.payload;
      }
    ),
  }),
  selectors: {
    getFoo: (state) => state.foo,
    getStocks: (state) => {
      return state.stocks[state.symbol as any];
    },
    getSymbol: (state) => state.symbol,
    getCurrentValues: (state) => state.currentValues
  },
});

export const { setStocks, setSymbol, setCurrentValue } = stocksSlice.actions;

export const { getFoo, getStocks, getSymbol, getCurrentValues } = stocksSlice.selectors;
