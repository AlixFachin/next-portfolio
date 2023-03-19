import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

import defaultPic from "public/img/fahrul-razi-BR6lrzCPYPk-unsplash.jpg";

type FeaturedPostsProps = {
  postsData: PostMetaData[];
};

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = ({
  postsData,
}) => {
  if (postsData.length === 0) {
    return (
      <section>
        <p>
          Cannot find any featured posts! Have a look at the{" "}
          <Link href="/posts">blog roll</Link> instead...
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col backdrop-blur-md w-full py-8 bg-white/30">
      <div className="flex items-center">
        <h2 className="text-3xl text-orange-300 pl-8 mb-4 mr-10">
          Featured Posts
        </h2>
        <div
          role="button"
          className="bg-orange-400 max-h-10 rounded-lg px-4 py-2 mr-8"
        >
          <Link href="/posts">All Posts</Link>
        </div>
        <div
          role="button"
          className="bg-orange-400 max-h-10 rounded-lg px-4 py-2"
        >
          <Link href="/tags">All Tags</Link>
        </div>
        <div className="flex-grow max-w-[30%]"></div>
      </div>
      <div className="flex flex-wrap items-center justify-evenly w-full">
        {postsData.map((post) => (
          <div
            key={post.id}
            className="w-[350px] h-[260px] bg-white flex flex-col mr-4 mb-4 p-4 border-solid border-8 border-orange-300/50 rounded-lg shadow-lg"
          >
            <Link href={`/posts/${post.id}`}>
              <h3 className="text-2xl text-orange-300">{post.title}</h3>
            </Link>
            <div className="self-end p-2 flex justify-around text-sm mb-2">
              {post.tags.map((tag: string) => (
                <div className="tag" key={tag}>
                  <Link href={`/tags/${tag}`}>{tag}</Link>
                </div>
              ))}
            </div>

            <div className="bg-orange-300/5 rounded-md shadow-sm flex-grow p-4 ">
              {post.description}{" "}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
