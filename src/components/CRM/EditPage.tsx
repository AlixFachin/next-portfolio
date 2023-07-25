import {
    Controller,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import {
    fb_getPageContent,
    fb_savePageContent,
} from '@/lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { FirebaseAppContext } from '@/contexts/fbAppProvider';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import rehypeSanitize from 'rehype-sanitize';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import revalidatePages from '@/lib/revalidate_client';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type EditPageProps = {
    pageId: string;
    pageLang: string;
};

const EditPage: React.FC<EditPageProps> = ({ pageId, pageLang }) => {
    const firebaseApp = useContext(FirebaseAppContext);
    const router = useRouter();

    const FormData_z = z.object({
        content: z.string(),
        // title: z.string(),
    });
    type FormData = z.infer<typeof FormData_z>;

    //   postData will contain initial values, after download from API
    const [pageData, setPageData] = useState<FormData | null>(null);
    const {
        handleSubmit,
        control,
        setValue,
        formState: { isValid },
    } = useForm({
        values: pageData || undefined,
        resolver: zodResolver(FormData_z),
        mode: 'onBlur',
    });

    // Effect -> At page load we download the content from Firebase
    useEffect(() => {
        fb_getPageContent(firebaseApp, pageId, pageLang).then((pageContent) => {
            if (pageContent) {
                setPageData({
                    content: pageContent,
                });
            } else {
                setPageData({
                    content: '',
                });
            }
        });
    }, [firebaseApp, pageId, pageLang]);

    const formSubmitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            await fb_savePageContent(
                firebaseApp,
                pageId,
                pageLang,
                data.content
            );
            await revalidatePages(firebaseApp, { pages: true });
            router.push('/admin/pageList');
        } catch (e) {
            console.error(`Error in the saving of the form`, e);
        }
    };

    if (!pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex max-w-full flex-col bg-white/80 py-8 px-4 md:w-11/12">
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                {/* Meta Data sub-form */}
                <div className="mb-2 grid grid-cols-1 gap-2 border-2 border-blue-200 p-4 md:grid-cols-2 lg:grid-cols-4">
                    <h2 className="mb-2xc py-2 font-title text-3xl text-blue-400 md:col-span-2 lg:col-span-4">
                        Meta Data
                    </h2>
                    <label className="mb-2 md:mr-4" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="border py-2 px-3 text-darkgrey-200 lg:col-span-3"
                        //   {...register("title")}
                    />
                </div>
                <div className="mb- border-2 border-blue-200 p-4">
                    <div className="md-editor mb-2 flex flex-col">
                        <h2 className="mb-2xc py-2 font-title text-3xl text-blue-400 md:col-span-4">
                            Content
                        </h2>
                        <div className="min-h-[50vh]">
                            <Controller
                                control={control}
                                name="content"
                                render={({ field }) => {
                                    return (
                                        <MDEditor
                                            value={field.value}
                                            previewOptions={{
                                                rehypePlugins: [
                                                    [rehypeSanitize],
                                                ],
                                            }}
                                            onChange={(value) => {
                                                setValue(
                                                    'content',
                                                    value || ''
                                                );
                                            }}
                                            minHeight={600}
                                            height={800}
                                            preview="edit"
                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-red text-red">
                    <p>{!isValid ? 'woops' : 'no errors'} </p>
                </div>

                <div className="flex justify-evenly p-4">
                    <div
                        className="rounded-sm bg-blue-400 py-2 px-4 text-white"
                        role="button"
                        onClick={() => router.push('/admin/pageList')}
                    >
                        Cancel
                    </div>
                    <div
                        className="rounded-sm bg-blue-400  py-2 px-4 text-white"
                        role="button"
                    >
                        Preview
                    </div>
                    <input
                        type="submit"
                        value="Save"
                        className="rounded-sm bg-blue-400  py-2 px-4 text-white"
                        role="button"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditPage;
