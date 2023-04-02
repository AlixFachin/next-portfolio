import StdLayout from "@/components/stdlayout";
import { GetStaticProps, NextPage } from "next";

import getPageData, { StaticPageData } from "@/lib/staticPages";
import Head from "next/head";

// TODO: Work on the schedule components:
// Animation regarding a timeline?
// Making different chapters?

const About: NextPage<StaticPageData> = (pageData) => {
  return (
    <StdLayout>
      <Head>
        <title>Code and Pastries | About Me</title>
        <meta
          name="description"
          content="Short Bio for the main writer of this site's blog articles, Alix Fachin"
        />
        <meta name="generator" content="next.js" />
        <meta name="keywords" content="blog, about, bio, resume" />
        <meta property="og:title" content="Code and Pastries | About Me Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta
          property="og:description"
          content="Short Bio for the main writer of this site's blog articles, Alix Fachin"
        />
        <meta property="og:site_name" content="Code and Pastries" />
      </Head>
      <main className="container max-w-3xl min-h-screen mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <h1 className="text-orange-200 text-5xl font-headers">About me</h1>
        <article
          className="mt-8 prose 
            max-w-none 
            prose-headings:text-orange-200
            prose-strong:text-orange-200/90
            prose-ul:mt-3
            "
        >
          <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
        </article>
      </main>
    </StdLayout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData("aboutme", "en");
  return {
    props: {
      ...pageData,
    },
  };
};
