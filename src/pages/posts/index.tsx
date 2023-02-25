import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { getSortedPostsData, getAllTagsList } from "@/lib/posts";
import FadeIn from "@/components/fadein";
import StdLayout from "@/components/stdlayout";
import dayjs from "dayjs";

type BlogRollParams = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
  tagMap: ReturnType<typeof getAllTagsList>;
};

const AllPosts: NextPage<BlogRollParams> = ({ allPostsData }) => {
  return (
    <StdLayout>
      <main className="container max-w-3xl mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <h1 className="text-5xl font-serif mb-2">All Blog Posts</h1>
        <section className="blogRoll">
          {allPostsData.map(({ id, date, title, tags }, loop_index) => (
            <div
              className="mb-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-start"
              key={`blogCard-${id}`}
            >
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
          ))}
        </section>
      </main>
    </StdLayout>
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
