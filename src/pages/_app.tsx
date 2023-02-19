import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/tokyo-night-dark.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
