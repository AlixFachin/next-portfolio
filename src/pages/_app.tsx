import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@/styles/tokyo-night-dark.css';

import { Fjalla_One, Noto_Sans, Source_Code_Pro } from '@next/font/google';
const sourceCodePro = Source_Code_Pro({
    subsets: ['latin'],
    variable: '--font-source-code-pro',
});
const notoSans = Noto_Sans({
    weight: ['200', '300', '400'],
    subsets: ['latin'],
    variable: '--font-noto-sans',
});
const fjalla = Fjalla_One({
    weight: ['400'],
    variable: '--font-fjalla-one',
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${notoSans.style.fontFamily};
                        --font-noto-sans: ${notoSans.style.fontFamily};
                        --font-source-code-pro: ${sourceCodePro.style
                            .fontFamily};
                        --font-title: ${fjalla.style.fontFamily};
                    }
                `}
            </style>
            <div className={`${notoSans.className}`}>
                <Component {...pageProps} />
            </div>
        </>
    );
}
