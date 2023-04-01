import { getAllPostsIds, getPostData } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PostData } from "@/lib/posts";
import StdLayout from "@/components/stdlayout";
import dayjs from "dayjs";
import Link from "next/link";
import Head from "next/head";

const Post: NextPage<PostData> = (postData) => {
  return (
    <>
      <Head>
        <title>Code and Pastries | {postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta name="generator" content="next.js" />
        <meta
          name="keywords"
          content={"blog, software development," + postData.tags.join(",")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content={"Code and Pastries | " + postData.title}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta property="og:description" content={postData.description} />
        <meta property="og:site_name" content="Code and Pastries" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StdLayout>
        <article className="p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col ">
          <header className="bg-white/50 p-4 rounded-md shadow-lg">
            <h1 className="text-5xl text-orange-300 mb-6">{postData.title} </h1>
            <div>{dayjs(postData.date).format("MMM-DD-YYYY")}</div>
            <div className="self-end p-2 flex justify-start text-sm ml-8">
              {postData.tags.map((tag, index) => (
                <div
                  className="py-1 px-4 mr-3 bg-orange-400 rounded-full"
                  key={index}
                >
                  <Link href={`/tags/${tag}`}>{tag}</Link>
                </div>
              ))}
            </div>
          </header>
          <section className="mt-8">
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </section>
        </article>
      </StdLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Return a list of possible values
  const paths = getAllPostsIds("en");
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || Array.isArray(params.id)) {
    return {
      notFound: true,
    };
  }
  const postData = await getPostData("en", params.id as string);
  return {
    props: {
      ...postData,
    },
  };
};

export default Post;
