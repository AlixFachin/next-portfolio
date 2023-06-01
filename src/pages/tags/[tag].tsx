import BlogMetaCard from '@/components/blogMetaCard';
import StdLayout from '@/components/stdlayout';
import {
    PostMetaData,
    getAllTagsList,
    getPostsMetaDataForTag,
} from '@/lib/posts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

type TagPageProps = {
    tag: string;
    postDataList: PostMetaData[];
};

const TagPage: NextPage<TagPageProps> = ({ tag, postDataList }) => {
    return (
        <>
            <Head>
                <title>Code and Pastries | {tag} tag post list </title>
                <meta
                    name="description"
                    content={`List of all the posts with the tag ${tag}`}
                />
                <meta name="generator" content="next.js" />
                <meta
                    name="keywords"
                    content={`blog, software development, ${tag}`}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:title"
                    content={`Code and Pastries | ${tag} tag post list`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta
                    property="og:description"
                    content={`List of all the posts with the tag ${tag}`}
                />
                <meta property="og:site_name" content="Code and Pastries" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StdLayout>
                <div className="flex flex-col rounded-md bg-white/90 px-4 py-12">
                    <h1 className="font-serif mb-6 rounded-sm p-4 text-5xl text-orange-300">
                        Posts with the {tag} tag
                    </h1>
                    <div>
                        {postDataList.map((postData, index) => (
                            <BlogMetaCard
                                postData={postData}
                                key={`post-${postData.id}-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </StdLayout>
        </>
    );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const tagList = await getAllTagsList('en');

    const paths = tagList.map((tagData) => ({
        params: {
            tag: tagData.tag,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || !params.tag || Array.isArray(params.tag)) {
        return {
            notFound: true,
        };
    }
    const postDataList = await getPostsMetaDataForTag('en', params.tag);
    return {
        props: {
            tag: params.tag,
            postDataList: postDataList,
        },
    };
};
