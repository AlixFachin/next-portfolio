import matter from "gray-matter";

import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";

import { getGHFileContentFromId } from "./github";

export type StaticPageData = {
  contentHtml: string;
};

const getPageData = async (
  pageName: string,
  locale: string
): Promise<StaticPageData> => {
  const fileContents = await getGHFileContentFromId("pages", locale, pageName);

  const matterResult = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);

  return {
    contentHtml: processedContent.toString(),
  };
};

export default getPageData;
