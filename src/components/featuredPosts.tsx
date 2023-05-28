import { PostMetaData } from '@/lib/posts';
import Link from 'next/link';

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
                ' mb-8 flex w-full max-w-3xl flex-col bg-white/90 py-8 px-10 backdrop-blur-md'
            }
        >
            {/* 'All tags' and 'All Posts' buttons */}
            <div className="mb-4 flex flex-wrap items-center">
                <h2 className="font-title text-3xl text-orange-300 md:mr-10  md:pl-8 md:text-5xl">
                    Featured Posts
                </h2>
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
            <div className="flex w-full flex-col items-start justify-evenly">
                {postsData.map((post) => (
                    <div
                        key={post.id}
                        className="mr-4 flex w-full flex-col border-b-2 border-solid border-orange-300/50 p-4"
                    >
                        <div className="flex w-full items-baseline">
                            <Link href={`/posts/${post.id}`}>
                                <h3 className="text-orange-200 sm:text-2xl">
                                    {post.title}
                                </h3>
                            </Link>
                            <div className="flex-grow"></div>
                            {post.tags.map((tag: string) => (
                                <Link
                                    href={`/tags/${tag}`}
                                    key={tag}
                                    className="mr-4 text-xs"
                                >
                                    <div className="rounded-sm bg-orange-400/40 px-2">
                                        {tag}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-2 pb-2 indent-4">
                            {post.description}{' '}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedPosts;
