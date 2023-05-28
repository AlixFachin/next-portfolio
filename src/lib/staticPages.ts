import matter from 'gray-matter';

import { unified } from 'unified';
import rehypeHighlight from 'rehype-highlight';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';

import { fb_getPageContent } from './firebase';
import { authenticate_server, getFirebaseApp_server } from './firebase_server';

export type StaticPageData = {
    contentHtml: string;
};

const getPageData = async (
    pageName: string,
    locale: string
): Promise<StaticPageData> => {
    const fbApp = getFirebaseApp_server();
    try {
        await authenticate_server(fbApp);
        const fileContents = await fb_getPageContent(fbApp, pageName, locale);

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
    } catch (e) {
        console.error(
            `Error in dowloading page ${pageName}(${locale}) data!`,
            e
        );
        return {
            contentHtml: 'Server error!',
        };
    }
};

export default getPageData;
