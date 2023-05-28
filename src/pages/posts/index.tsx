import { GetStaticProps, NextPage } from 'next';
import { getAllTagsList, getSortedPostsData } from '@/lib/posts';
import StdLayout from '@/components/stdlayout';
import Head from 'next/head';
import BlogMetaCard from '@/components/blogMetaCard';

type BlogRollParams = {
    allPostsData: Awaited<ReturnType<typeof getSortedPostsData>>;
    tagMap: Awaited<ReturnType<typeof getAllTagsList>>;
};

const AllPosts: NextPage<BlogRollParams> = ({ allPostsData }) => {
    return (
        <>
            <Head>
                <title>Code and Pastries | Blog Roll</title>
                <meta
                    name="description"
                    content="Blog Roll Page for Alix Fachin's blog dedicated to software development tips"
                />
                <meta name="generator" content="next.js" />
                <meta
                    name="keywords"
                    content="blog, software development, coding, JavaScript"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:title"
                    content="Code and Pastries | Blogroll Page"
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta
                    property="og:description"
                    content="Blog Roll Page for Alix Fachin's blog dedicated to software development tips"
                />
                <meta property="og:site_name" content="Code and Pastries" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StdLayout>
                <main className="container mx-auto max-w-3xl rounded-t-lg bg-white/90 px-4 py-12">
                    <h1 className="mb-4 rounded-lg py-4 px-2 font-title text-5xl text-orange-300">
                        All Blog Posts
                    </h1>
                    <section className="blogRoll">
                        {allPostsData.map((postData, loop_index) => (
                            <BlogMetaCard
                                postData={postData}
                                key={`post-${postData.id}-${loop_index}`}
                            />
                        ))}
                    </section>
                </main>
            </StdLayout>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = await getSortedPostsData('en');
    const tagMap = await getAllTagsList('en');
    return {
        props: {
            allPostsData,
            tagMap,
        },
    };
};

export default AllPosts;
