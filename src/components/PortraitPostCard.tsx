import { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

// TEMP: Temporary solution while we implement an image library in FireStore

type CardPostData = {
    id: string;
    title: string;
    published: Dayjs;
    blogSummary: string;
    tags: string[];
    imageURL: string;
    imageAlt: string;
};

const PortraitPostCard: React.FC<CardPostData> = (postData) => {
    let tagsDisplay = null;
    if (postData.tags.length > 0) {
        tagsDisplay = (
            <p className="text-sm font-extrabold uppercase text-orange-400">
                {postData.tags.join(' ')}
            </p>
        );
    }

    return (
        <Link href={`/posts/${postData.id}`}>
            <div className="mr-4 mb-4 flex h-[400px] w-[300px] flex-col items-stretch justify-start rounded-lg border-[1px] border-orange-400 hover:shadow-2xl hover:shadow-orange-300">
                <div className="h-[165px] w-[298px] overflow-hidden">
                    <Image
                        width={800}
                        height={533}
                        src={postData.imageURL}
                        alt={postData.imageAlt}
                    />
                </div>

                <div className="flex flex-grow flex-col items-start justify-start py-6 px-10">
                    <h4 className="text-xl font-bold text-orange-200">
                        {postData.title}
                    </h4>
                    <p className="max-h-[70px] overflow-hidden text-ellipsis">
                        {postData.blogSummary}
                    </p>
                    <div className="flex-grow"></div>
                    {tagsDisplay}
                    <p className="text-sm font-thin">
                        {
                            // TODO -> Adapt the date format to the current locale
                            postData.published.format('DD-MMM-YY')
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PortraitPostCard;
