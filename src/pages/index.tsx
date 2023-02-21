import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { getAllTagsList, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import dayjs from "dayjs";
import FadeIn from "@/components/fadein";

const inter = Inter({ subsets: ["latin"] });

type HomeParams = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
  tagMap: ReturnType<typeof getAllTagsList>;
};

const Home: NextPage<HomeParams> = ({ allPostsData, tagMap }) => {
  return (
    <>
      <Head>
        <title>Alix Fachin Blog</title>
        <meta
          name="description"
          content="Home Page of blog dedicated to development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-1/2 py-8 ">
        <FadeIn direction="from-left">
          <h1 className="font-title text-black text-6xl pl-8">
            Welcome to alix-fachin.dev
          </h1>
        </FadeIn>

        <div className="fixed top-0 left-0 -z-10 w-full">
          <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 600"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-300 ease-in-out delay-150"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
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
              className="transition-all duration-300 ease-in-out delay-150 path-0"
              transform="rotate(-180 720 300)"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
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
              className="transition-all duration-300 ease-in-out delay-150 path-1"
              transform="rotate(-180 720 300)"
            ></path>
          </svg>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <h2 className="text-2xl font-serif mb-2">About this site</h2>
        <div className="mb-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-start">
          Like a lot of coders, I solved issues and made progress thanks to
          countless people who wrote some blog posts and articles regarding
          coding issues. Hopefully this site will be a way to give back to the
          community, and maybe as well helping me remember some of the content!
        </div>
        <section className="blogRoll">
          {allPostsData.map(({ id, date, title, tags }, loop_index) => (
            <FadeIn
              key={`blogCard-${id}`}
              direction={loop_index % 2 === 0 ? "from-left" : "from-right"}
            >
              <div className="mb-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-start">
                <h3 className="text-orange-300/80  hover:text-orange-300 text-2xl mb-3 w-full align-middle">
                  <Link href={`/posts/${id}`}>{title}</Link>
                </h3>
                <div className="flex flex-row items-center">
                  <div className="">{dayjs(date).format("DD-MMM-YY")}</div>
                  <div className="flex-grow">
                    {
                      // spacer
                    }
                  </div>
                  <div className="self-end p-2 flex justify-around text-sm">
                    {tags.map((tag: string) => (
                      <div className="tag" key={tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData("en");
  const tagMap = getAllTagsList("en");
  return {
    props: {
      allPostsData,
      tagMap,
    },
  };
};
