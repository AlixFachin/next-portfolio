import { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

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

type CardPostData = {
    id: string;
    title: string;
    published: Dayjs;
    blogSummary: string;
    tags: string[];
    imageId: string;
};

const PortraitPostCard: React.FC<CardPostData> = (postData) => {
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
            <p className="text-sm font-extrabold uppercase text-orange-400">
                {postData.tags.join(' ')}
            </p>
        );
    }

    return (
        <Link href={`/posts/${postData.id}`}>
            <div className="mr-4 mb-4 flex h-[400px] w-[300px] flex-col items-stretch justify-start rounded-lg border-[1px] border-orange-400 hover:shadow-2xl hover:shadow-orange-300">
                <Image
                    width={300}
                    height={170}
                    src={imageData.imagePath}
                    alt={imageData.imageAlt}
                />
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
