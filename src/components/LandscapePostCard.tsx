import { Dayjs } from 'dayjs';
import Image from 'next/image';

type CardPostData = {
    title: string;
    published: Dayjs;
    blogSummary: string;
    imageRef: string;
    imageDisclaimer: string;
    imageAlt: string;
};

const LandscapeCard: React.FC<CardPostData> = (postData) => {
    return (
        <article className="mb-4 flex h-[353px] w-[580px] items-stretch border-[1px] border-orange-400">
            <Image
                width={265}
                height={353}
                src={postData.imageRef}
                alt={postData.imageAlt}
            />
            <section className="flex flex-col items-start justify-start py-7 px-6">
                <p className="text-sm font-light">
                    {postData.published.format('DD-MMM-YY')}
                </p>
                <h4 className="mb-2 text-2xl font-bold text-orange-300">
                    {postData.title}
                </h4>
                {/* TODO: cut the blog summary in order to display only a certain number of characters. (Or ellipsis?)  */}
                <p className="flex-grow">{postData.blogSummary}</p>
            </section>
        </article>
    );
};

export default LandscapeCard;
