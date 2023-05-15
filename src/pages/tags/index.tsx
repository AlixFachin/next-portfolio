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
        <main className="container mx-auto max-w-3xl rounded-t-lg bg-white/90 px-4 py-12">
          <h1 className="mb-4 rounded-lg py-4 px-2 font-title text-5xl text-orange-300">
            Tag Cloud (WIP)
          </h1>
        </main>
        <div>No tags found!</div>
      </StdLayout>
    );
  }

  return (
    <StdLayout>
      <main className="container mx-auto max-w-3xl rounded-t-lg bg-white/90 px-4 py-12">
        <h1 className="mb-4 rounded-lg py-4 px-2 font-title text-5xl text-orange-300">
          Tag Cloud (WIP)
        </h1>
        <section className="flex flex-col rounded-md bg-white/60 p-4">
          {tagList.map((tagData) => (
            <div key={tagData.tag} className="tag mb-2 max-w-min">
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
