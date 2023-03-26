import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";

export type StaticPageData = {
  contentHtml: string;
};

const getPageData = async (
  pageName: string,
  locale: string
): Promise<StaticPageData> => {
  const postsDirectory = path.join(process.cwd(), "content/static", locale);
  const fullPath = path.join(postsDirectory, `${pageName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

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
