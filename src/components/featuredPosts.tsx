import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

import defaultPic from "public/img/fahrul-razi-BR6lrzCPYPk-unsplash.jpg";

type FeaturedPostsProps = {
  postsData: PostMetaData[];
  extraClass?: string;
};

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = ({
  postsData,
  extraClass,
}) => {
  if (postsData.length === 0) {
    return (
      <section className={extraClass}>
        <p>
          Cannot find any featured posts! Have a look at the{" "}
          <Link href="/posts">blog roll</Link> instead...
        </p>
      </section>
    );
  }

  return (
    <section
      className={
        extraClass +
        " flex flex-col backdrop-blur-md max-w-3xl mb-8 w-full py-8 px-10 bg-white/90"
      }
    >
      {/* 'All tags' and 'All Posts' buttons */}
      <div className="flex items-center flex-wrap mb-4">
        <h2 className="text-3xl md:text-5xl font-title text-orange-300  md:pl-8 md:mr-10">
          Featured Posts
        </h2>
        <Link href="/posts" aria-label="all posts page">
          <div
            role="button"
            className="bg-orange-400 hover:bg-orange-300/70 max-h-10 rounded-lg px-4 py-2 mr-8 drop-shadow-md"
          >
            All Posts
          </div>
        </Link>
        <Link href="/tags" aria-label="all tags page">
          <div
            role="button"
            className="bg-orange-400 hover:bg-orange-300/70 max-h-10 rounded-lg px-4 py-2 drop-shadow-md"
          >
            All Tags
          </div>
        </Link>
        <div className="flex-grow"></div>
      </div>
      {/* Aligning the boxes displaying post summaries */}
      <div className="flex flex-col items-start justify-evenly w-full">
        {postsData.map((post) => (
          <div
            key={post.id}
            className="w-full flex flex-col mr-4 p-4 border-solid border-b-2 border-orange-300/50"
          >
            <div className="flex w-full items-baseline">
              <Link href={`/posts/${post.id}`}>
                <h3 className="sm:text-2xl text-orange-200">{post.title}</h3>
              </Link>
              <div className="flex-grow"></div>
              {post.tags.map((tag: string) => (
                <Link href={`/tags/${tag}`} key={tag} className="mr-4 text-xs">
                  <div className="bg-orange-400/40 px-2 rounded-sm">{tag}</div>
                </Link>
              ))}
            </div>

            <div className="pt-2 pb-2 indent-4">{post.description} </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
