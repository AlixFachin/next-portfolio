import { PostMetaData } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

// TEMP: Temporary solution while we implement an image library in FireStore

type BlogImageData = {
    id: string;
    imagePath: string;
    imageAlt: string;
    imageDisclaimer: string;
};

const imageLibrary: BlogImageData[] = [
    {
        id: 'fire',
        imagePath:
            'https://firebasestorage.googleapis.com/v0/b/blog-crm-3db84.appspot.com/o/lucas-kapla-fire-unsplash.jpg?alt=media&token=00aa520d-5d51-4f66-a547-f665302a5acb',
        imageAlt: 'Orange Fire Background',
        imageDisclaimer:
            'Photo by [Lucas Kapla](https://unsplash.com/@aznbokchoy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-fire-with-water-drops-on-it-GAM-7l4QzmI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)',
    },
    {
        id: 'staircase',
        imagePath:
            'https://firebasestorage.googleapis.com/v0/b/blog-crm-3db84.appspot.com/o/maxime-lebrun-staircase-unsplash.jpg?alt=media&token=177ff6c9-fb9a-4e1f-a635-40878a0abbb6',
        imageAlt: 'Orange spiral staircase',
        imageDisclaimer:
            'Photo by [Maxime Lebrun](https://unsplash.com/@flub?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/1o2071GOVp0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)',
    },
];

type CardPostData = PostMetaData & {
    imageId: string;
};

const SmallPostCard: React.FC<CardPostData> = (postData) => {
    let imageData = imageLibrary.find(
        (imgData) => imgData.id === postData.imageId
    );
    if (!imageData) {
        console.error(
            `Image ${postData.imageId} for post ${postData.title} not found!`
        );
        imageData = imageLibrary[0];
    }

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
                        width={300}
                        height={170}
                        src={imageData.imagePath}
                        alt={imageData.imageAlt}
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
