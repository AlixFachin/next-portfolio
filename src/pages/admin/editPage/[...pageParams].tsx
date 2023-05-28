import AdminLayout from '@/components/adminLayout';
import { useRouter } from 'next/router';
import EditPage from '@/components/CRM/EditPage';
import { NextPage } from 'next';
import Link from 'next/link';

const EditPagePage: NextPage = () => {
    const nextRouter = useRouter();
    const routeParams = nextRouter.query.pageParams;

    if (!Array.isArray(routeParams)) {
        return (
            <AdminLayout>
                <div className="flex flex-col bg-white/80">
                    <h1 className="text-4xl">Error!</h1>
                    <div>Page parameter incorrectly set!</div>
                    <Link href="/admin/pageList">
                        <div
                            role="button"
                            className="rounded-lg bg-orange-300 p-2"
                        >
                            Go back to admin page
                        </div>
                    </Link>
                </div>
            </AdminLayout>
        );
    }
    const pageId: string = routeParams[0];

    // TODO: Replace the 'en' by the Next default locale
    const pageLang = routeParams.length >= 2 ? routeParams[1] : 'en';

    return (
        <AdminLayout>
            <EditPage pageId={pageId} pageLang={pageLang} />
        </AdminLayout>
    );
};

export default EditPagePage;
