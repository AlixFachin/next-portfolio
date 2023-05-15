import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { fb_getPostById, fb_savePost } from "@/lib/firebase";
import { useState, useEffect, useContext } from "react";
import { PostData, PostData_z } from "@/lib/posts";
import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

import rehypeSanitize from "rehype-sanitize";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
    setValue,
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
      router.push("/admin");
    } catch (e) {
      console.error(`Error in the saving of the form`, e);
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex max-w-full flex-col bg-white/80 py-8 px-4 md:w-11/12">
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        {/* Meta Data sub-form */}
        <div className="mb-2 grid grid-cols-1 gap-2 border-2 border-blue-200 p-4 md:grid-cols-2 lg:grid-cols-4">
          <h2 className="mb-2xc py-2 font-title text-3xl text-blue-400 md:col-span-2 lg:col-span-4">
            Meta Data
          </h2>
          <label className="mb-2 md:mr-4" htmlFor="title">
            Title
          </label>
          <input
            className="border py-2 px-3 text-darkgrey-200 lg:col-span-3"
            {...register("title")}
          />
          <div className="mb-2 flex items-center py-2">
            <input
              type="checkbox"
              className="mr-2 border py-2 px-3 text-darkgrey-200"
              {...register("isDraft")}
            />
            <label htmlFor="draft">Draft</label>
          </div>
          <div className="mb-2 flex items-center py-2">
            <input
              type="checkbox"
              className="mr-2 border py-2 px-3 text-darkgrey-200"
              {...register("featured")}
            />
            <label htmlFor="draft">Featured</label>
          </div>
          <label htmlFor="locale" className="md:mr-4 lg:text-right">
            Locale
          </label>
          <select
            className="border py-2 px-3 text-darkgrey-200"
            {...register("locale")}
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <label htmlFor="slug">Slug</label>
          <input
            className="border py-2 px-3 text-darkgrey-200 lg:col-span-3"
            {...register("slug")}
          />
          <label htmlFor="publishedDate">Date</label>
          <input
            className="border py-2 px-3 text-darkgrey-200 invalid:text-red"
            {...register("published")}
          />
          <label htmlFor="tagString" className="md:mr-4 lg:text-right">
            Tags
          </label>
          <input
            className="border py-2 px-3 text-darkgrey-200"
            {...register("tagString")}
          />
          <div className="border-red text-red">
            {errors && <p> {`${errors.tagString?.message}`} </p>}
          </div>
          <label htmlFor="description" className="md:col-span-2 lg:col-span-4">
            Description
          </label>
          <textarea
            className="border py-2 px-3 text-darkgrey-200 md:col-span-2 md:row-span-2 lg:col-span-4"
            rows={2}
            {...register("description")}
          />
          <div className="mb-2 flex flex-col"></div>
        </div>
        <div className="mb- border-2 border-blue-200 p-4">
          <div className="md-editor mb-2 flex flex-col">
            <h2 className="mb-2xc py-2 font-title text-3xl text-blue-400 md:col-span-4">
              Content
            </h2>
            <div className="min-h-[50vh]">
              <Controller
                control={control}
                name="content"
                render={({ field }) => {
                  return (
                    <MDEditor
                      value={field.value}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                      onChange={(value) => {
                        setValue("content", value || "");
                      }}
                      minHeight={600}
                      height={800}
                      preview="edit"
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="border-red text-red">
          {errors && <p> {`${errors.published?.message}`} </p>}
        </div>

        <div className="flex justify-evenly p-4">
          <div
            className="rounded-sm bg-blue-400 py-2 px-4 text-white"
            role="button"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </div>
          <div
            className="rounded-sm bg-blue-400  py-2 px-4 text-white"
            role="button"
          >
            Preview
          </div>
          <input
            type="submit"
            value="Save"
            className="rounded-sm bg-blue-400  py-2 px-4 text-white"
            role="button"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
