import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import dayjs from "dayjs";

type BlogMetaCardProps = {
  postData: PostMetaData;
};

const BlogMetaCard: React.FC<BlogMetaCardProps> = ({ postData }) => {
  return (
    <div className="p-3 flex flex-col justify-start border-b-orange-400 border-b-2">
      <div className="flex items-center">
        <h2 className="text-orange-200/80  hover:text-orange-200 text-3xl align-middle mt-2 mb-2">
          <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
        </h2>
        <div className="flex-grow"></div>
        <div>{dayjs(postData.date).format("MMM-YY")}</div>
      </div>
      <div className="flex flex-row items-center ml-8">
        {postData.tags.map((tag: string) => (
          <Link href={`/tags/${tag}`} key={tag}>
            <div className="bg-orange-400/30 mr-4 text-xs px-2 rounded-sm">
              {tag}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogMetaCard;
