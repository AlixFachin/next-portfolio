import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/tokyo-night-dark.css";

import { Source_Code_Pro, Oswald, Noto_Sans } from "@next/font/google";
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});
const notoSans = Noto_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            ${notoSans.variable}: ${notoSans.style};
            ${sourceCodePro.variable}: ${sourceCodePro.style};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
