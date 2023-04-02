import { GetStaticProps, NextPage } from "next";
import StdLayout from "@/components/stdlayout";
import { getAllTagsList } from "@/lib/posts";
import Link from "next/link";

// Objective for version 1:
// Get post metadata for each tag
// i.e. How many posts for each tag? When was the latest post?

type TagListProps = {
  tagList: ReturnType<typeof getAllTagsList>;
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
      <h1 className="text-5xl font-serif mb-2 bg-white/75 rounded-md p-4">
        List of all the tags used on the site
      </h1>
      <div className="bg-white/60 rounded-md flex flex-col p-4">
        {tagList.map((tagData) => (
          <div key="tag" className="tag max-w-min mb-2">
            <Link href={`/tags/${tagData.tag}`}>{tagData.tag}</Link>
          </div>
        ))}
      </div>
    </StdLayout>
  );
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const tagList = getAllTagsList("en");
  return {
    props: {
      tagList,
    },
  };
};

export default TagList;
