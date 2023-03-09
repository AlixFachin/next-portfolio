import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import dayjs from "dayjs";

type BlogMetaCardProps = {
  postData: PostMetaData;
};

const BlogMetaCard: React.FC<BlogMetaCardProps> = ({ postData }) => {
  return (
    <div className="mb-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-start">
      <h3 className="text-orange-300/80  hover:text-orange-300 text-2xl mb-3 w-full align-middle">
        <Link href={`/posts/${postData.id}`}>{postData.title}</Link>
      </h3>
      <div className="flex flex-row items-center">
        <div className="">{dayjs(postData.date).format("DD-MMM-YY")}</div>
        <div className="flex-grow">
          {
            // spacer
          }
        </div>
        <div className="self-end p-2 flex justify-around text-sm">
          {postData.tags.map((tag: string) => (
            <div className="tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogMetaCard;
