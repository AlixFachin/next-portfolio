import { GetStaticProps, NextPage } from "next";
import StdLayout from "@/components/stdlayout";
import { getAllTagsList } from "@/lib/posts";
import Link from "next/link";
2;

// Objective for version 1:
// Get post metadata for each tag
// i.e. How many posts for each tag? When was the latest post?

type TagListProps = {
  tagList: Awaited<ReturnType<typeof getAllTagsList>>;
};

const TagList: NextPage<TagListProps> = ({ tagList }) => {
  if (!tagList) {
    return (
      <StdLayout>
        <main className="container max-w-3xl mx-auto px-4 py-12 bg-white/90 rounded-t-lg">
          <h1 className="text-5xl font-title mb-4 py-4 px-2 rounded-lg text-orange-300">
            Tag Cloud (WIP)
          </h1>
        </main>
        <div>No tags found!</div>
      </StdLayout>
    );
  }

  return (
    <StdLayout>
      <main className="container max-w-3xl mx-auto px-4 py-12 bg-white/90 rounded-t-lg">
        <h1 className="text-5xl font-title mb-4 py-4 px-2 rounded-lg text-orange-300">
          Tag Cloud (WIP)
        </h1>
        <section className="bg-white/60 rounded-md flex flex-col p-4">
          {tagList.map((tagData) => (
            <div key={tagData.tag} className="tag max-w-min mb-2">
              <Link href={`/tags/${tagData.tag}`}>{tagData.tag}</Link>
            </div>
          ))}
        </section>
      </main>
    </StdLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tagList = await getAllTagsList("en");
  return {
    props: {
      tagList,
    },
  };
};

export default TagList;
