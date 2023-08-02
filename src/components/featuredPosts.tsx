import { DefaultPostImage, PostMetaData } from '@/lib/posts';
import Link from 'next/link';
import dayjs from 'dayjs';
import PortraitPostCard from './PortraitPostCard';

type FeaturedPostsProps = {
    postsData: PostMetaData[];
    extraClass?: string;
};

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = ({
    postsData,
    extraClass,
}) => {
    if (postsData.length === 0) {
        return (
            <section className={extraClass}>
                <p>
                    Cannot find any featured posts! Have a look at the{' '}
                    <Link href="/posts">blog roll</Link> instead...
                </p>
            </section>
        );
    }

    return (
        <section
            className={
                extraClass +
                ' mb-8 flex w-full max-w-6xl flex-col bg-white/40 py-8 px-10 backdrop-blur-md'
            }
        >
            {/* 'All tags' and 'All Posts' buttons */}
            <div className="mb-8 flex flex-wrap items-center">
                <h2 className="font-title text-3xl text-orange-300 md:mr-10  md:pl-8 md:text-5xl">
                    Featured Posts
                </h2>
                <div className="flex-grow"></div>
                <Link href="/posts" aria-label="all posts page">
                    <div
                        role="button"
                        className="mr-8 max-h-10 rounded-lg bg-orange-400 px-4 py-2 drop-shadow-md hover:bg-orange-300/70"
                    >
                        All Posts
                    </div>
                </Link>
                <Link href="/tags" aria-label="all tags page">
                    <div
                        role="button"
                        className="max-h-10 rounded-lg bg-orange-400 px-4 py-2 drop-shadow-md hover:bg-orange-300/70"
                    >
                        All Tags
                    </div>
                </Link>
                <div className="flex-grow"></div>
            </div>
            {/* Aligning the boxes displaying post summaries */}
            <div className="flex w-full flex-wrap justify-center">
                {postsData.map((post) => (
                    // <LandscapeCard
                    //     key={post.id}
                    //     title={post.title}
                    //     blogSummary={post.description}
                    //     published={dayjs(post.published)}
                    //     imageRef="/img/gattotere-staircase-unsplash.jpg"
                    //     imageDisclaimer="Disclaimer here"
                    //     imageAlt="image of a staircase"
                    // />
                    <PortraitPostCard
                        id={post.id}
                        title={post.title}
                        published={dayjs(post.published)}
                        blogSummary={post.description}
                        tags={post.tags}
                        imageURL={
                            post.featuredImageURL
                                ? post.featuredImageURL
                                : DefaultPostImage.url
                        }
                        imageAlt={
                            post.featuredImageURL
                                ? post.imageAlt ||
                                  `Featured image for blog ${post.title}`
                                : DefaultPostImage.alt
                        }
                        key={post.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedPosts;
