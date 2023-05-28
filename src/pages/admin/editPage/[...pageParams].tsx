import AdminLayout from '@/components/adminLayout';
import { useRouter } from 'next/router';
import EditPage from '@/components/CRM/EditPage';

const EditPagePage = () => {
    const nextRouter = useRouter();
    const routeParams = nextRouter.query.pageParams;

    if (!Array.isArray(routeParams)) {
        console.error('Error in the route parameters!');
        nextRouter.replace('/admin');
        return <></>;
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
