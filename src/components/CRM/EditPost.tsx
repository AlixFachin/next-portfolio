import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { fb_getPostById, fb_savePost } from "@/lib/firebase";
import { useState, useEffect, useContext } from "react";
import { PostData, PostData_z } from "@/lib/posts";
import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

type EditPostProps = {
  postId: string;
};

type FormData = Omit<PostData, "tags"> & { tagString: string };

const EditPost: React.FC<EditPostProps> = ({ postId }) => {
  const firebaseApp = useContext(FirebaseAppContext);
  const router = useRouter();

  //   const postData = await fb_getPostById(postId);
  const [postData, setPostData] = useState<FormData | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: postData || undefined,
    // resolver: zodResolver(PostData_z),
    mode: "onBlur",
  });

  useEffect(() => {
    fb_getPostById(firebaseApp, postId).then((returnPostData) => {
      if (returnPostData) {
        setPostData({
          ...returnPostData,
          tagString: returnPostData.tags.join(","),
        });
      }
    });
  }, []);

  const formSubmitHandler: SubmitHandler<FormData> = async (data) => {
    console.log(`Trying to save the data`);
    console.log(data);

    // fancy way to remove the 'tagString' property from the fbData sent to Firebase
    const { tagString: _, ...fbData } = {
      ...data,
      tags: data.tagString.split(",").map((x) => x.trim()),
    };

    try {
      await fb_savePost(firebaseApp, fbData);
    } catch (e) {
      console.error(`Error in the saving of the form`, e);
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full bg-white flex flex-col py-8 px-4">
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        {/* Meta Data sub-form */}
        <div className="border-blue-200 border-2 mb-2 p-4">
          <div className="flex flex-col mb-2">
            <label className="mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="border py-2 px-3 text-darkgrey-200"
              {...register("title")}
            />
          </div>
          <div className="flex mb-2 items-center py-2">
            <input
              type="checkbox"
              className="border mr-2 py-2 px-3 text-darkgrey-200"
              {...register("isDraft")}
            />
            <label htmlFor="draft">Draft</label>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="locale">Locale</label>
            <select
              className="border py-2 px-3 text-darkgrey-200"
              {...register("locale")}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="slug">Slug</label>
            <input
              className="border py-2 px-3 text-darkgrey-200"
              {...register("slug")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="publishedDate">Date</label>
            <input
              className="border py-2 px-3 text-darkgrey-200 invalid:text-red"
              {...register("published")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="tagString">Tags</label>
            <input
              className="border py-2 px-3 text-darkgrey-200"
              {...register("tagString")}
            />
            <div className="text-red border-red">
              {errors && <p> {`${errors.tagString?.message}`} </p>}
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="border py-2 px-3 text-darkgrey-200"
              rows={2}
              {...register("description")}
            />
          </div>
        </div>
        <div className="border-blue-200 border-2 mb- p-4">
          <div className="flex flex-col mb-2">
            <label htmlFor="content">Content</label>
            <textarea
              className="border py-2 px-3 text-darkgrey-200"
              rows={2}
              {...register("content")}
            />
          </div>
        </div>
        <div className="text-red border-red">
          {errors && <p> {`${errors.published?.message}`} </p>}
        </div>

        <div className="flex justify-evenly p-4">
          <div
            className="bg-blue-400 text-white py-2 px-4 rounded-sm"
            role="button"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </div>
          <div
            className="bg-blue-400 text-white  py-2 px-4 rounded-sm"
            role="button"
          >
            Preview
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-blue-400 text-white  py-2 px-4 rounded-sm"
            role="button"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
