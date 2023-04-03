import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { getSortedPostsData, getAllTagsList } from "@/lib/posts";
import FadeIn from "@/components/fadein";
import StdLayout from "@/components/stdlayout";
import dayjs from "dayjs";
import Head from "next/head";
import BlogMetaCard from "@/components/blogMetaCard";

type BlogRollParams = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
  tagMap: ReturnType<typeof getAllTagsList>;
};

const AllPosts: NextPage<BlogRollParams> = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>Code and Pastries | Blog Roll</title>
        <meta
          name="description"
          content="Blog Roll Page for Alix Fachin's blog dedicated to software development tips"
        />
        <meta name="generator" content="next.js" />
        <meta
          name="keywords"
          content="blog, software development, coding, JavaScript"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Code and Pastries | Blogroll Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta
          property="og:description"
          content="Blog Roll Page for Alix Fachin's blog dedicated to software development tips"
        />
        <meta property="og:site_name" content="Code and Pastries" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StdLayout>
        <main className="container max-w-3xl mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
          <h1 className="text-5xl font-serif mb-4 py-4 px-2 rounded-lg bg-gradient-to-l from-orange-300 to-orange-400">
            All Blog Posts
          </h1>
          <section className="blogRoll">
            {allPostsData.map((postData, loop_index) => (
              <BlogMetaCard
                postData={postData}
                key={`post-${postData.id}-${loop_index}`}
              />
            ))}
          </section>
        </main>
      </StdLayout>
    </>
  );
};

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

export default AllPosts;
