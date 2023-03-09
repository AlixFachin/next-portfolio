import fs from "fs";
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

export function getSortedPostsData(language: string): PostMetaData[] {
  const postDirectory = path.join(process.cwd(), "content", language);

  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove '.md' from filename
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const postMetaData = PostMetaData.parse({
      id,
      ...matterResult.data,
      date: dayjs(matterResult.data.date).toISOString(),
    });

    // TODO: Sort the result

    return postMetaData;
  });

  return allPostsData;
}

export function getFeaturedPostsData(language: string): PostMetaData[] {
  const postDirectory = path.join(process.cwd(), "content", language);

  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove '.md' from filename
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const postMetaData = PostMetaData.parse({
      id,
      ...matterResult.data,
      date: dayjs(matterResult.data.date).toISOString(),
    });
    return postMetaData;
  });

  return allPostsData.slice(0, 3);
}

type PostId = {
  id: string;
};

type AllPostsIdsReturn = GetStaticPathsResult<PostId>["paths"];

export function getAllPostsIds(language: string): AllPostsIdsReturn {
  const postDirectory = path.join(process.cwd(), "content", language);

  const fileNames = fs.readdirSync(postDirectory);
  const result = fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
  return result;
}

export async function getPostData(
  language: string,
  id: string
): Promise<PostData> {
  const postsDirectory = path.join(process.cwd(), "content", language);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

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

export function getAllTagsList(language: string) {
  const postDirectory = path.join(process.cwd(), "content", language);
  const tagMap: Record<string, number> = {};

  const fileNames = fs.readdirSync(postDirectory);
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    for (let tag of matterResult.data.tags) {
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

export function getPostsMetaDataForTag(language: string, tag: string) {
  const postDirectory = path.join(process.cwd(), "content", language);

  const postDataList: PostMetaData[] = [];

  const fileNames = fs.readdirSync(postDirectory);
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    if (matterResult.data.tags.includes(tag)) {
      const postMetaData = PostMetaData.parse({
        id: fileName.replace(/\.md$/, ""),
        ...matterResult.data,
        date: dayjs(matterResult.data.date).toISOString(),
      });
      postDataList.push(postMetaData);
    }
  });

  return postDataList;
}
