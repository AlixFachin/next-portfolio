import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import dayjs from "dayjs";

type BlogMetaCardProps = {
  postData: PostMetaData;
};

const BlogMetaCard: React.FC<BlogMetaCardProps> = ({ postData }) => {
  return (
    <div className="p-4 flex flex-col justify-start border-b-orange-400 border-b-2">
      <div className="flex items-baseline">
        <Link href={`/posts/${postData.id}`}>
          <h2 className="text-orange-200/80  hover:text-orange-200 text-4xl align-middle mt-2 mb-2">
            {postData.title}
          </h2>
        </Link>
        <div className="flex-grow"></div>
        <div className="text-sm">{dayjs(postData.date).format("MMM-YY")}</div>
      </div>
      <div className="flex flex-row items-center ml-2 pt-1">
        {postData.tags.map((tag: string) => (
          <Link href={`/tags/${tag}`} key={tag}>
            <div className="bg-orange-400/30 mr-4 text-xs px-2 rounded-sm">
              {tag}
            </div>
          </Link>
        ))}
      </div>
      <div className="pt-2 pb-2 indent-2 text-sm">{postData.description} </div>
    </div>
  );
};

export default BlogMetaCard;
