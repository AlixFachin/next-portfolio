import Link from "next/link";
import { GetStaticProps } from "next";
import { getSortedPostData } from "@/lib/posts";

export default function AllPosts({ allPostsData }) {
  return <section>{allPostsData.map()}</section>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostData("en");
  return {
    props: {
      allPostsData,
    },
  };
};
