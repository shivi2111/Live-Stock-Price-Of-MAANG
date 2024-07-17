import { getFoo } from '@/lib/features/stocks/stocksSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import Stocks from './Stock'

export default function StocksPage() {
    return <Stocks />
}

