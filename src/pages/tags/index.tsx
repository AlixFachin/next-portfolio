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
        <h1 className="text-4xl text-orange-200 bg-white/75 rounded-md p-4">
          Tag Cloud
        </h1>
        <div>No tags found!</div>
      </StdLayout>
    );
  }

  return (
    <StdLayout>
      <h1 className="text-3xl md:text-5xl font-serif mb-4 py-4 px-2 rounded-lg bg-gradient-to-br from-orange-300 to-orange-400">
        Tag Cloud (WIP)
      </h1>
      <div className="bg-white/60 rounded-md flex flex-col p-4">
        {tagList.map((tagData) => (
          <div key={tagData.tag} className="tag max-w-min mb-2">
            <Link href={`/tags/${tagData.tag}`}>{tagData.tag}</Link>
          </div>
        ))}
      </div>
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
