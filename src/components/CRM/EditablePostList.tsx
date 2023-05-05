import { PostMetaData } from "@/lib/posts";
import Link from "next/link";

type EditablePostListProps = {
  postList: PostMetaData[];
};

const EditablePostList: React.FC<EditablePostListProps> = ({ postList }) => {
  if (postList.length === 0) {
    return <div>Empty list!</div>;
  }

  return (
    <div className="flex flex-col align-center bg-white py-4">
      {postList.map((postData) => (
        <div
          className="border-y-2 border-blue-200 py-4 px-2 flex"
          key={postData.id}
        >
          <div className="text-orange-300 font-title"> {postData.title}</div>
          <div className="flex-grow"></div>
          <Link href={`admin/edit/${postData.id}`}>
            <div
              className="bg-blue-400 text-white rounded-md py-2 px-4"
              role="button"
            >
              Edit
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EditablePostList;
