import { PostMetaData } from '@/lib/posts';
import Link from 'next/link';
import dayjs from 'dayjs';

type BlogMetaCardProps = {
    postData: PostMetaData;
};

const BlogMetaCard: React.FC<BlogMetaCardProps> = ({ postData }) => {
    return (
        <div className="flex flex-col justify-start border-b-2 border-b-orange-400 p-4">
            <div className="flex items-baseline">
                <Link href={`/posts/${postData.id}`}>
                    <h2 className="mt-2  mb-2 align-middle text-4xl text-orange-200/80 hover:text-orange-200">
                        {postData.title}
                    </h2>
                </Link>
                <div className="flex-grow"></div>
                <div className="text-sm">
                    {dayjs(postData.published).format('MMM-YY')}
                </div>
            </div>
            <div className="ml-2 flex flex-row items-center pt-1">
                {postData.tags.map((tag: string) => (
                    <Link href={`/tags/${tag}`} key={tag}>
                        <div className="mr-4 rounded-sm bg-orange-400/30 px-2 text-xs">
                            {tag}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pt-2 pb-2 indent-2 text-sm">
                {postData.description}{' '}
            </div>
        </div>
    );
};

export default BlogMetaCard;
