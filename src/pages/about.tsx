import StdLayout from "@/components/stdlayout";
import { GetStaticProps, NextPage } from "next";

import getPageData, { StaticPageData } from "@/lib/staticPages";

// TODO: Work on the schedule components:
// Animation regarding a timeline?
// Making different chapters?

const About: NextPage<StaticPageData> = (pageData) => {
  return (
    <StdLayout>
      <main className="container max-w-3xl min-h-screen mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <h1 className="text-orange-300 text-5xl font-headers">About me</h1>
        <article
          className="mt-8 prose 
            max-w-none 
            prose-headings:text-orange-300
            prose-strong:text-orange-300/90
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
