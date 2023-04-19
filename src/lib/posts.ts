import path from "path";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next";
import dayjs from "dayjs";

import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";

import { z } from "zod";
import {
  getGHDirContent,
  getGHFileContentFromId,
  getGHFileContentFromPath,
} from "./github";

const PostMetaData = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string().datetime(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()),
  featuredImageURL: z.string().optional(),
  imageLegend: z.string().optional(),
  description: z.string(),
});

export type PostMetaData = z.infer<typeof PostMetaData>;
export type PostData = PostMetaData & { contentHtml: string };

export async function getSortedPostsData(
  language: string
): Promise<PostMetaData[]> {
  const postDirectory = path.join(process.cwd(), "content/blog", language);

  // const fileNames = fs.readdirSync(postDirectory);
  const filesData = await getGHDirContent("posts", "en");
  const allPostsData = await Promise.all(
    filesData.map(async (fileData) => {
      // remove '.md' from filename
      const id = fileData.name.replace(/\.md$/, "");

      // const fullPath = path.join(postDirectory, fileName);
      // const fileContents = fs.readFileSync(fullPath, "utf8");
      const fileContents = await getGHFileContentFromPath(fileData.path);

      const matterResult = matter(fileContents);
      const postMetaData = PostMetaData.parse({
        id,
        ...matterResult.data,
        date: dayjs(matterResult.data.date).toISOString(),
      });

      return postMetaData;
    })
  );

  return allPostsData
    .filter(
      (metaData) => metaData.draft === undefined || metaData.draft === false
    )
    .sort((metaData1, metaData2) =>
      // We want to sort in descending order, so we compare date2 with date1
      dayjs(metaData2.date).diff(metaData1.date, "date")
    );
}

export async function getFeaturedPostsData(
  language: string
): Promise<PostMetaData[]> {
  const postDirectory = path.join(process.cwd(), "content/blog", language);

  // const fileNames = fs.readdirSync(postDirectory);
  const filesData = await getGHDirContent("posts", "en");
  const allPostsData = await Promise.all(
    filesData.map(async (fileData) => {
      // remove '.md' from filename
      const id = fileData.name.replace(/\.md$/, "");

      // const fullPath = path.join(postDirectory, fileData.path);
      // const fileContents = fs.readFileSync(fullPath, "utf8");
      const fileContents = await getGHFileContentFromPath(fileData.path);

      const matterResult = matter(fileContents);
      const postMetaData = PostMetaData.parse({
        id,
        ...matterResult.data,
        date: dayjs(matterResult.data.date).toISOString(),
      });
      return postMetaData;
    })
  );

  return allPostsData
    .filter(
      (postMetaData) =>
        postMetaData.draft === undefined || postMetaData.draft === false
    )
    .slice(0, 5);
}

type PostId = {
  id: string;
};

type AllPostsIdsReturn = GetStaticPathsResult<PostId>["paths"];

export async function getAllPostsIds(
  language: string
): Promise<AllPostsIdsReturn> {
  const postDirectory = path.join(process.cwd(), "content/blog", language);

  const filesData = await getGHDirContent("posts", "en");
  // const fileNames = fs.readdirSync(postDirectory);
  const result = filesData.map((fileData) => ({
    params: {
      id: fileData.name.replace(/\.md$/, ""),
    },
  }));
  return result;
}

export async function getPostData(
  language: string,
  id: string
): Promise<PostData> {
  //const postsDirectory = path.join(process.cwd(), "content/blog", language);
  //const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContents = fs.readFileSync(fullPath, "utf8");
  const fileContents = await getGHFileContentFromId("posts", language, id);

  const matterResult = matter(fileContents);
  const postMetaData = PostMetaData.parse({
    id,
    ...matterResult.data,
    date: dayjs(matterResult.data.date).toISOString(),
  });

  // Extract markdown content
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    ...postMetaData,
    contentHtml,
  };
}

export async function getAllTagsList(language: string) {
  //const postDirectory = path.join(process.cwd(), "content/blog", language);
  const tagMap: Record<string, number> = {};

  //const fileNames = fs.readdirSync(postDirectory);
  const filesData = await getGHDirContent("posts", language);

  const extractedTagLists = await Promise.all(
    filesData.map(async (fileData) => {
      const fileContents = await getGHFileContentFromPath(fileData.path);
      const matterResult = matter(fileContents);
      if (matterResult.data.draft) {
        return [];
      }
      return matterResult.data.tags;
    })
  );

  extractedTagLists.forEach((tagList) => {
    for (let tag of tagList) {
      if (!tagMap[tag]) {
        tagMap[tag] = 0;
      }
      tagMap[tag] = tagMap[tag] + 1;
    }
  });

  const result: { tag: string; frequency: number }[] = [];

  for (const tag of Object.keys(tagMap)) {
    result.push({ tag: tag, frequency: tagMap[tag] });
  }

  return result.sort((a, b) => b.frequency - a.frequency);
}

export async function getPostsMetaDataForTag(language: string, tag: string) {
  const postDataList: PostMetaData[] = [];

  const filesData = await getGHDirContent("posts", language);

  const filesMetaData = await Promise.all(
    filesData.map(async (fileData) => {
      const fileContents = await getGHFileContentFromPath(fileData.path);
      const matterResult = matter(fileContents);
      const postMetaData = PostMetaData.parse({
        id: fileData.name.replace(/\.md$/, ""),
        ...matterResult.data,
        date: dayjs(matterResult.data.date).toISOString(),
      });
      return postMetaData;
    })
  );

  return filesMetaData.filter(
    (metaData) => !metaData.draft && metaData.tags.includes(tag)
  );
}
