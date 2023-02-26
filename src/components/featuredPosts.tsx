import { PostMetaData } from "@/lib/posts";
import Link from "next/link";

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
    <section className="flex flex-col bg-white/30 w-full">
      <h2 className="text-xl text-orange-300 pl-8 mb-4">Featured Posts</h2>
      <div className="flex flex-w items-center justify-around bg-white/30 w-full">
        {postsData.map((post) => (
          <div
            key={post.id}
            className="w-[350px] h-[350px] bg-orange-300/20 mr-4 p-4 flex flex-col"
          >
            <div className="w-full h-full bg-white flex flex-col p-4">
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-lg text-orange-300">{post.title}</h3>
              </Link>
              <div className="self-end p-2 flex justify-around text-sm">
                {post.tags.map((tag: string) => (
                  <div className="tag" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
