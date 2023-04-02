import BlogMetaCard from "@/components/blogMetaCard";
import StdLayout from "@/components/stdlayout";
import {
  getAllTagsList,
  getPostsMetaDataForTag,
  PostMetaData,
} from "@/lib/posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type TagPageProps = {
  tag: string;
  postDataList: PostMetaData[];
};

const TagPage: NextPage<TagPageProps> = ({ tag, postDataList }) => {
  return (
    <StdLayout>
      <h1 className="text-3xl font-serif mb-6 p-4 rounded-sm">
        Blogs with the tag {tag}{" "}
      </h1>
      <div>
        {postDataList.map((postData, index) => (
          <BlogMetaCard
            postData={postData}
            key={`post-${postData.id}-${index}`}
          />
        ))}
      </div>
    </StdLayout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const tagList = getAllTagsList("en");

  const paths = tagList.map((tagData) => ({
    params: {
      tag: tagData.tag,
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

  const postDataList = getPostsMetaDataForTag("en", params.tag);
  return {
    props: {
      tag: params.tag,
      postDataList: postDataList,
    },
  };
};
