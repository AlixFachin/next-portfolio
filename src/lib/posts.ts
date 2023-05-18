import path from "path";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next";
import dayjs from "dayjs";

import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

import { z } from "zod";

import { authenticate_server, getFirebaseApp_server } from "./firebase_server";
import {
  fb_getAllPostsId,
  fb_getAllPostsMetaDataList,
  fb_getAllTagsList,
  fb_getFeaturedPostsMetaDataList,
  fb_getMetaDataListForTag,
  fb_getPostData,
} from "./firebase";

export const PostMetaData_z = z.object({
  id: z
    .string({ required_error: "Post ID is necessary!" })
    .min(1, "String must be non empty!"),
  title: z.string().min(1, "String must be non empty!"),
  slug: z.string().min(1, "String must be non empty!"),
  locale: z.enum(["en", "ja"]),
  published: z.string().datetime(),
  isDraft: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()),
  featuredImageURL: z.string().optional(),
  imageLegend: z.string().optional(),
  description: z.string().min(1, "String must be non empty!"),
});
const PostContent = z.object({ content: z.string() });

export const PostData_z = PostMetaData_z.merge(PostContent);

export type PostMetaData = z.infer<typeof PostMetaData_z>;
export type PostData = z.infer<typeof PostData_z>;

export async function markdownToHtml(mdContent: string): Promise<string> {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(mdContent);

  return processedContent.toString();
}

export async function getSortedPostsData(
  language: string
): Promise<PostMetaData[]> {
  const fbApp = getFirebaseApp_server();

  try {
    await authenticate_server(fbApp);
    return fb_getAllPostsMetaDataList(fbApp);
  } catch (e) {
    console.error("Error in getting posts!");
    return [];
  }
}

export async function getFeaturedPostsData(
  language: string
): Promise<PostMetaData[]> {
  const fbApp = getFirebaseApp_server();
  try {
    await authenticate_server(fbApp);
    return fb_getFeaturedPostsMetaDataList(fbApp);
  } catch (e) {
    console.error("Error in getting Featured Posts!", e);
    return [];
  }
}

type PostId = {
  id: string;
};

type AllPostsIdsReturn = GetStaticPathsResult<PostId>["paths"];

export async function getAllPostsIds(
  language: string
): Promise<AllPostsIdsReturn> {
  //   const postDirectory = path.join(process.cwd(), "content/blog", language);

  //   const filesData = await getGHDirContent("posts", "en");
  //   // const fileNames = fs.readdirSync(postDirectory);
  //   const result = filesData.map((fileData) => ({
  //     params: {
  //       id: fileData.name.replace(/\.md$/, ""),
  //     },
  //   }));
  const fbApp = getFirebaseApp_server();
  try {
    await authenticate_server(fbApp);
    return fb_getAllPostsId(fbApp);
  } catch (e) {
    console.error("Error in getting All Posts Id!", e);
    return [];
  }
}

export async function getPostData(
  language: string,
  id: string
): Promise<PostData | null> {
  //const postsDirectory = path.join(process.cwd(), "content/blog", language);
  //const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContents = fs.readFileSync(fullPath, "utf8");

  const fbApp = getFirebaseApp_server();
  try {
    await authenticate_server(fbApp);
    const postData = await fb_getPostData(fbApp, id);
    if (postData) {
      return postData;
    }
    return null;
  } catch (e) {
    console.error("Error in getting All Posts Id!", e);
    return null;
  }
}

export async function getAllTagsList(language: string) {
  const fbApp = getFirebaseApp_server();
  try {
    await authenticate_server(fbApp);
    const tagMap = await fb_getAllTagsList(fbApp, language);
    const result: { tag: string; frequency: number }[] = [];

    for (const tag of Object.keys(tagMap)) {
      result.push({ tag: tag, frequency: tagMap[tag] });
    }

    return result.sort((a, b) => b.frequency - a.frequency);
  } catch (e) {
    console.error("Error in getting All Posts Id!", e);
    return [];
  }
}

export async function getPostsMetaDataForTag(
  language: string,
  tag: string
): Promise<PostMetaData[]> {
  const fbApp = getFirebaseApp_server();
  try {
    await authenticate_server(fbApp);
    const result = await fb_getMetaDataListForTag(fbApp, language, tag);
    return result;
  } catch (e) {
    console.error("Error in getting All Posts Id!", e);
    return [];
  }
}
