import { getAllPostsIds, getPostData, markdownToHtml } from '@/lib/posts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { PostData } from '@/lib/posts';
import StdLayout from '@/components/stdlayout';
import dayjs from 'dayjs';
import Link from 'next/link';
import Head from 'next/head';

const Post: NextPage<PostData & { contentHtml: string }> = ({
    contentHtml,
    ...postData
}) => {
    return (
        <>
            <Head>
                <title>Code and Pastries | {postData.title}</title>
                <meta name="description" content={postData.description} />
                <meta name="generator" content="next.js" />
                <meta
                    name="keywords"
                    content={
                        'blog, software development,' + postData.tags.join(',')
                    }
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:title"
                    content={'Code and Pastries | ' + postData.title}
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta
                    property="og:description"
                    content={postData.description}
                />
                <meta property="og:site_name" content="Code and Pastries" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StdLayout>
                <section className="flex flex-col bg-white/90 py-4 px-2">
                    <header className="flex flex-col border-b-2 border-orange-300 pb-2">
                        <div className="flex items-center">
                            <h1 className="font-serif rounded-lg py-4 px-2 text-xl text-orange-300 md:text-4xl">
                                {postData.title}
                            </h1>
                            <div className="flex-grow"></div>
                            {postData.tags.map((tag, index) => (
                                <Link href={`/tags/${tag}`} key={index}>
                                    <div
                                        className="mr-3 rounded-md bg-orange-400/60 py-1 px-4 text-sm text-black"
                                        role="button"
                                    >
                                        {tag}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="ml-8 text-sm">
                            {dayjs(postData.published).format('MMM-DD-YYYY')}
                        </div>
                    </header>
                    <article className="rounded-lg p-8 shadow-lg backdrop-blur-sm">
                        <div
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </article>
                </section>
            </StdLayout>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Return a list of possible values
    const paths = await getAllPostsIds('en');
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || !params.id || Array.isArray(params.id)) {
        return {
            notFound: true,
        };
    }
    const postData = await getPostData('en', params.id as string);

    const contentHtml = await (async () => {
        if (postData?.content) {
            return markdownToHtml(postData?.content);
        }
        return Promise.resolve('');
    })();
    return {
        props: {
            ...postData,
            contentHtml: contentHtml,
        },
    };
};

export default Post;
