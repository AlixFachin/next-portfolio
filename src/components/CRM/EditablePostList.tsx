import { PostData } from "@/lib/posts";

type EditablePostListProps = {
  postList: PostData[];
};

const EditablePostList: React.FC<EditablePostListProps> = ({ postList }) => {
  if (postList.length === 0) {
    return <div>Empty list!</div>;
  }

  return (
    <div className="flex flex-col align-center">
      {postList.map((postData) => (
        <div>{postData.title}</div>
      ))}
    </div>
  );
};

export default EditablePostList;
