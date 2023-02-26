import StdLayout from "@/components/stdlayout";
import { getAllTagsList, getPostsIdsForTag } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type TagPageProps = {
  postIdList: string[];
};

const TagPage: NextPage<TagPageProps> = ({ postIdList }) => {
  return (
    <StdLayout>
      <div>
        {postIdList.map((postId) => (
          <div> {postId} </div>
        ))}
      </div>
    </StdLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const tagMap = getAllTagsList("en");

  const paths = Object.keys(tagMap).map((tag) => ({
    params: {
      tag: tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  if (!params || !params.tag || Array.isArray(params.tag)) {
    return {
      notFound: true,
    };
  }

  const postIdList = getPostsIdsForTag("en", params.tag);
  return {
    props: {
      postIdList: postIdList,
    },
  };
};
