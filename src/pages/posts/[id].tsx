import {
    PostData_z,
    getAllPostsIds,
    getPostData,
    markdownToHtml,
} from '@/lib/posts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { PostData } from '@/lib/posts';
import StdLayout from '@/components/stdlayout';
import dayjs from 'dayjs';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

type PostPageData = PostData & { contentHtml: string };

const ImageArea: React.FC<{
    imageURL: string;
    imageLegend?: string;
    imageAlt?: string;
}> = ({ imageURL, imageLegend, imageAlt }) => {
    if (!imageURL) return null;

    return (
        <div className="mb-4 flex flex-col items-center justify-start">
            <Image
                src={imageURL}
                alt={imageAlt || imageLegend || `Abstract image for blog post`}
                width={800}
                height={450}
            />
            {imageLegend ? <div className="text-sm">{imageLegend}</div> : null}
        </div>
    );
};

const Post: NextPage<PostPageData> = ({ contentHtml, ...postData }) => {
    // Defining several blocks to make the reading below easier
    const headSection = (
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
            <meta property="og:description" content={postData.description} />
            <meta property="og:site_name" content="Code and Pastries" />

            <link rel="icon" href="/favicon.ico" />
        </Head>
    );

    return (
        <>
            {headSection}
            <StdLayout>
                <section className="flex flex-col bg-white/90 py-4 px-2">
                    <header className="flex flex-col border-b-2 border-orange-300 pb-2">
                        <div className="flex items-center">
                            <h1 className="font-serif rounded-lg py-4 px-2 text-3xl text-orange-300 md:text-4xl">
                                {postData.title}
                            </h1>
                        </div>
                        <div className="ml-8 mb-2 text-sm">
                            {dayjs(postData.published).format('MMM-DD-YYYY')}
                        </div>
                        <div className="ml-8 text-sm font-semibold uppercase text-orange-400 ">
                            {postData.tags.map((tag, index) => (
                                <Link href={`/tags/${tag}`} key={index}>
                                    <span className="mr-4 px-2 hover:rounded-md hover:bg-orange-400 hover:text-darkgrey-300 ">
                                        {tag}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </header>
                    <article className="flex flex-col items-start justify-start p-8">
                        {postData.featuredImageURL ? (
                            <ImageArea
                                imageURL={postData.featuredImageURL}
                                imageAlt={postData.imageAlt}
                                imageLegend={postData.imageLegend}
                            />
                        ) : null}
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
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<PostPageData> = async ({
    params,
}) => {
    if (!params || !params.id || Array.isArray(params.id)) {
        return {
            notFound: true,
        };
    }
    const postData = await getPostData('en', params.id as string);
    if (!postData) {
        return {
            notFound: true,
        };
    }

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
