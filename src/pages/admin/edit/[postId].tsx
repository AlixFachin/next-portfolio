import { useForm } from "react-hook-form";
import AdminLayout from "@/components/adminLayout";
import { useRouter } from "next/router";
import EditPost from "@/components/CRM/EditPost";

/*
 Edit Post 
*/

const EditPostPage = () => {
  const nextRouter = useRouter();
  const postId = nextRouter.query["postId"];
  if (typeof postId !== "string") {
    return <div>Error in the page query!</div>;
  }

  // Add buttons: Save, Cancel, Preview
  return (
    <AdminLayout>
      <EditPost postId={postId} />
    </AdminLayout>
  );
};

export default EditPostPage;
