import AdminHeader from './AdminHeader';
import Footer from './footer';
import FirebaseUserProvider from '@/contexts/fbUserProvider';
import FirebaseAppProvider from '@/contexts/fbAppProvider';

export interface LayoutProps {
    children?: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <FirebaseAppProvider>
                <FirebaseUserProvider>
                    <AdminHeader />
                    <main className="container mx-auto mt-[10vh] flex min-h-[400px] max-w-full flex-col items-center pt-4">
                        {children}
                    </main>
                </FirebaseUserProvider>
            </FirebaseAppProvider>
            <Footer />
        </>
    );
};

export default AdminLayout;
