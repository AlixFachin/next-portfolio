import StdLayout from '@/components/stdlayout';
import { GetStaticProps, NextPage } from 'next';

import getPageData, { StaticPageData } from '@/lib/staticPages';
import Head from 'next/head';

// TODO: Work on the schedule components:
// Animation regarding a timeline?
// Making different chapters?

const About: NextPage<StaticPageData> = (pageData) => {
    return (
        <StdLayout>
            <Head>
                <title>Code and Pastries | About Me</title>
                <meta
                    name="description"
                    content="Short Bio for the main writer of this site's blog articles, Alix Fachin"
                />
                <meta name="generator" content="next.js" />
                <meta name="keywords" content="blog, about, bio, resume" />
                <meta
                    property="og:title"
                    content="Code and Pastries | About Me Page"
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta
                    property="og:description"
                    content="Short Bio for the main writer of this site's blog articles, Alix Fachin"
                />
                <meta property="og:site_name" content="Code and Pastries" />
            </Head>
            <main className="container mx-auto min-h-screen max-w-3xl rounded-t-lg bg-white/90 px-4 py-12 backdrop-blur-sm">
                <h1 className="font-title text-5xl text-orange-300">
                    About me
                </h1>
                <article
                    className="prose mt-8 
            max-w-none 
            prose-headings:text-orange-200
            prose-strong:text-orange-200/90
            prose-ul:mt-3
            "
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: pageData.contentHtml,
                        }}
                    />
                </article>
            </main>
        </StdLayout>
    );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
    const pageData = await getPageData('aboutme', 'en');
    return {
        props: {
            ...pageData,
        },
    };
};
