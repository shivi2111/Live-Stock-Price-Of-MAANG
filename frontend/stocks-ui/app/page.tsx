import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import Page from './stocks/page';

export default function IndexPage() {
  return <Counter />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
