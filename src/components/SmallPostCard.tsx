import { DefaultPostImage, PostMetaData } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

type CardPostData = PostMetaData;

const SmallPostCard: React.FC<CardPostData> = (postData) => {
    let tagsDisplay = null;
    if (postData.tags.length > 0) {
        tagsDisplay = (
            <div className="flex flex-wrap text-sm font-light uppercase text-orange-400">
                {postData.tags.map((tag, index) => (
                    <div className="mr-6" key={index}>
                        {tag}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Link href={`/posts/${postData.id}`}>
            <div className="mr-4 mb-4 flex  w-[260px] flex-col items-center justify-start rounded-lg border-[1px] border-orange-400 hover:shadow-2xl hover:shadow-orange-300 sm:h-[150px] sm:w-full sm:flex-row">
                <div className="flex h-[148px] w-[250px] items-center justify-center overflow-hidden rounded-lg shadow-sm">
                    <Image
                        width={800}
                        height={350}
                        src={
                            postData.featuredImageURL
                                ? postData.featuredImageURL
                                : DefaultPostImage.url
                        }
                        alt={
                            postData.featuredImageURL
                                ? postData.imageAlt ||
                                  `descriptive image for post ${postData.title}`
                                : DefaultPostImage.alt
                        }
                    />
                </div>
                <div className="flex h-full max-w-[480px] flex-shrink flex-grow flex-col items-start justify-start px-6 py-4">
                    <div className=" mb-4 flex flex-col sm:flex-row">
                        <div className="mr-8 text-sm font-thin">
                            {
                                // TODO -> Adapt the date format to the current locale
                                dayjs(postData.published).format('DD-MMM-YY')
                            }
                        </div>
                        {tagsDisplay}
                    </div>
                    <h4 className="text-2xl font-bold text-orange-200">
                        {postData.title}
                    </h4>
                    <p className="flex-grow overflow-hidden text-ellipsis">
                        {postData.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default SmallPostCard;
