import Head from 'next/head';
import Script from 'next/script';
import { getFeaturedPostsData, getSortedPostsData } from '@/lib/posts';
import { GetStaticProps, NextPage } from 'next';
import FadeIn from '@/components/fadein';
import FeaturedPosts from '@/components/featuredPosts';
import Footer from '@/components/footer';
import BioSummary from '@/components/bioSummary';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HomeParams = {
    featuredPostsData: Awaited<ReturnType<typeof getSortedPostsData>>;
};

const Home: NextPage<HomeParams> = ({ featuredPostsData }) => {
    return (
        <>
            <Head>
                <title>Code and Pastries | Home Page</title>
                <meta
                    name="description"
                    content="Home Page for Alix Fachin's blog dedicated to software development tips"
                />
                <meta name="generator" content="next.js" />
                <meta
                    name="keywords"
                    content="blog, software development, coding, JavaScript"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:title"
                    content="Code and Pastries | Home Page"
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta
                    property="og:description"
                    content="Home Page for Alix Fachin's blog dedicated to software development tips"
                />
                <meta property="og:site_name" content="Code and Pastries" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script
                src="/particles.js"
                onReady={() => {
                    // The script needs to be loaded each time the component is mounted, hence the "onReady" event
                    // @ts-ignore
                    particlesJS.load('particles-js', '/particles.json');
                }}
            />
            <main className="flex flex-col items-center">
                <section
                    className="container mx-auto h-[100vh] w-[100vw] rounded-t-lg bg-white/50 
        px-4 py-12 backdrop-blur-sm"
                >
                    <div
                        id="particles-js"
                        className="absolute top-0 left-0 h-[100vh] w-[100vw]"
                    ></div>
                    <FadeIn direction="from-left">
                        <h1
                            className=" max-w-3xl bg-gradient-to-tl from-orange-300 to-orange-400 bg-clip-text pl-8 -indent-8 font-headers text-4xl
           font-bold text-transparent md:text-6xl"
                        >
                            Welcome to Code & Pastries!
                        </h1>
                    </FadeIn>
                    <div className="flex h-full max-h-[calc(100vh-13rem)] flex-col">
                        <article
                            className="mb-3 flex max-w-3xl flex-col justify-start rounded-lg
              bg-white/80 p-3 shadow-lg
              backdrop-blur-sm"
                        >
                            <h2 className="font-serif mb-2 text-2xl">
                                About this site
                            </h2>
                            <p>
                                Like a lot of coders, I solved issues and made
                                progress thanks to countless people who wrote
                                some blog posts and articles regarding coding
                                issues. Hopefully this site will be a way to
                                give back to the community, and maybe as well
                                helping me remember some of the content!
                            </p>
                            <h3>Why Code and Pastries?</h3>
                            <p>
                                Mostly because I thought it would be an original
                                title, and because I wanted at some point to
                                write a blog about baking. I am curious to see
                                what happens if I force myself to only (mostly?)
                                use pastry-related terms for examples instead of{' '}
                                <code>foo</code> and <code>bar</code>!
                            </p>
                        </article>
                        <div className="flex-grow"></div>
                        <div
                            className="invisible mt-8 w-[50px] max-w-[100px] self-center text-3xl text-orange-300 motion-safe:animate-bounce
                md:visible"
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                    </div>
                </section>
                <div className="absolute top-[100vh] left-0 -z-10 w-full ">
                    <svg
                        width="100%"
                        height="100%"
                        id="svg"
                        viewBox="0 0 1440 600"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition delay-150 duration-300 ease-in-out"
                    >
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="50%"
                                x2="100%"
                                y2="50%"
                            >
                                <stop offset="5%" stopColor="#ff6900"></stop>
                                <stop offset="95%" stopColor="#fcb900"></stop>
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,600 C 0,600 0,200 0,200 C 106.27751196172247,176.0956937799043 212.55502392344494,152.19138755980862 291,167 C 369.44497607655506,181.80861244019138 420.0574162679426,235.33014354066984 527,227 C 633.9425837320574,218.66985645933016 797.2153110047846,148.488038277512 917,146 C 1036.7846889952154,143.511961722488 1113.0813397129186,208.7177033492823 1193,229 C 1272.9186602870814,249.2822966507177 1356.4593301435407,224.64114832535887 1440,200 C 1440,200 1440,600 1440,600 Z"
                            stroke="none"
                            strokeWidth="0"
                            fill="url(#gradient)"
                            fillOpacity="0.53"
                            className="path-0 transition-all delay-150 duration-300 ease-in-out"
                            transform="rotate(-180 720 300)"
                        ></path>
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="50%"
                                x2="100%"
                                y2="50%"
                            >
                                <stop offset="5%" stopColor="#ff6900"></stop>
                                <stop offset="95%" stopColor="#fcb900"></stop>
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,600 C 0,600 0,400 0,400 C 75.23444976076553,425.92344497607655 150.46889952153106,451.8468899521531 260,464 C 369.53110047846894,476.1531100478469 513.3588516746412,474.53588516746413 629,472 C 744.6411483253588,469.46411483253587 832.0956937799042,466.00956937799043 912,446 C 991.9043062200958,425.99043062200957 1064.2583732057417,389.4258373205741 1151,379 C 1237.7416267942583,368.5741626794259 1338.870813397129,384.2870813397129 1440,400 C 1440,400 1440,600 1440,600 Z"
                            stroke="none"
                            strokeWidth="0"
                            fill="url(#gradient)"
                            fillOpacity="1"
                            className="path-1 transition-all delay-150 duration-300 ease-in-out"
                            transform="rotate(-180 720 300)"
                        ></path>
                    </svg>
                </div>

                <FeaturedPosts postsData={featuredPostsData} />
                <BioSummary />
            </main>
            <Footer />
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeParams> = async () => {
    const featuredPostsData = await getFeaturedPostsData('en');
    return {
        props: {
            featuredPostsData,
        },
    };
};
