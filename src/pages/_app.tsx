import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/tokyo-night-dark.css";

import {
  Source_Code_Pro,
  Noto_Sans,
  Montserrat,
  Caveat,
} from "@next/font/google";
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});
const notoSans = Noto_Sans({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
const montserrat = Montserrat({
  weight: ["200", "400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const caveat = Caveat({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${caveat.style.fontFamily};
            --font-noto-sans: ${notoSans.style.fontFamily};
            --font-source-code-pro: ${sourceCodePro.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}
      </style>
      <div className={`${notoSans.className}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
