import { PostMetaData } from '@/lib/posts';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseAppContext } from '@/contexts/fbAppProvider';
import { fb_addPost, fb_deletePost } from '@/lib/firebase';
import ConfirmDialog, { ConfirmDialogProps } from '@/components/ConfirmDialog';
import revalidatePages from '@/lib/revalidate_client';

type EditablePostListProps = {
    postList: PostMetaData[];
    refreshList: () => void;
};

const EditablePostList: React.FC<EditablePostListProps> = ({
    postList,
    refreshList,
}) => {
    const firebaseApp = useContext(FirebaseAppContext);
    const router = useRouter();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [confirmDialogProps, setConfirmDialogProps] =
        useState<ConfirmDialogProps | null>(null);

    if (postList.length === 0) {
        return (
            <div>
                No posts written yet! Please create your first post with the
                `New Post` button above
            </div>
        );
    }

    // Functions related to displaying the confirmation dialog
    const showConfirmationDialog = (
        message: string,
        confirmValue: string,
        onConfirm: () => void
    ) => {
        setConfirmDialogProps({
            message: message,
            confirmValue: confirmValue,
            onConfirm: onConfirm,
            setHidden: () => setDialogVisible(false),
        });

        setDialogVisible(true);
    };

    // Adding a new post will create one in the database and right away switch to the editing window for this post
    const addNewPost = async () => {
        const newPostId = await fb_addPost(firebaseApp);
        router.push(`/admin/edit/${newPostId}`);
    };

    const deletePost = async (
        postId: string,
        postTitle: string,
        postSlug?: string
    ) => {
        const confirmValue = postSlug ? postSlug : postTitle;
        // TODO: Add error management
        showConfirmationDialog(
            `Are you sure you want to delete post ${postTitle}?\nPlease input ${confirmValue} to validate`,
            confirmValue,
            () => {
                //TODO: Show a spinner / waiting item instead of the list, and
                // force a refresh afterwards
                fb_deletePost(firebaseApp, postId).then(() => {
                    if (refreshList) refreshList();
                });
            }
        );
    };

    // Calling the revalidation API for major pages
    const rebuildPages = async () => {        
        await revalidatePages(firebaseApp, { pages: true })        
    }

    return (
        <div className="align-center flex flex-col bg-white/80 py-4 px-4">
            {dialogVisible && confirmDialogProps ? (
                <ConfirmDialog {...confirmDialogProps} />
            ) : (
                ''
            )}
            <div className="mb-4 flex items-center border-b-2 border-blue-200">
                <h2 className="mb-4 text-4xl text-blue-400">All Posts List</h2>
                <div className="flex-grow"></div>
                <div
                    className="mx-4 h-fit rounded-md bg-orange-400 py-2 px-4 text-sm text-white"
                    role="button"
                    onClick={() => {
                        if (refreshList) refreshList();
                    }}
                >
                    Refresh List
                </div>
                <div
                    className="mx-4 h-fit rounded-md bg-orange-300 py-2 px-4 text-sm text-white"
                    role="button"
                    onClick={rebuildPages}
                >
                    Rebuild Pages
                </div>
                <div
                    className="mr-4 h-fit rounded-md bg-blue-400 py-2 px-4 text-white"
                    role="button"
                    onClick={addNewPost}
                >
                    New Post
                </div>
            </div>

            {postList.map((postData) => (
                <div
                    className="grid grid-cols-6 gap-2 border-b-2 border-blue-200 py-4 px-2"
                    key={postData.id}
                >
                    <div className="col-span-4 min-w-[800px] font-title text-2xl text-blue-400">
                        {postData.title}
                        {postData.isDraft ? (
                            <span className="text-xl italic text-orange-300">
                                {' '}
                                (draft){' '}
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                    <Link href={`admin/edit/${postData.id}`}>
                        <div
                            className="mr-4 rounded-md bg-blue-400 py-2 px-4 text-center text-white"
                            role="button"
                        >
                            Edit
                        </div>
                    </Link>
                    <div
                        className="rounded-md bg-orange-300 py-2 px-4 text-center text-white"
                        role="button"
                        onClick={() => {
                            deletePost(
                                postData.id,
                                postData.title,
                                postData.slug
                            );
                        }}
                    >
                        Delete
                    </div>
                    <div className="col-span-5 text-sm text-darkgrey-300">
                        {postData.description}
                    </div>
                    <div className="text-sm text-darkgrey-300">
                        {new Date(postData.published).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditablePostList;
