import AdminHeader from "./AdminHeader";
import Footer from "./footer";
import FirebaseUserProvider from "@/contexts/fbUserProvider";
import FirebaseAppProvider from "@/contexts/fbAppProvider";

export interface LayoutProps {
  children?: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <FirebaseAppProvider>
        <FirebaseUserProvider>
          <AdminHeader />
          <main className="container min-h-[400px] max-w-3xl mx-auto mt-[10vh] pt-4">
            {children}
          </main>
        </FirebaseUserProvider>
      </FirebaseAppProvider>
      <Footer />
    </>
  );
};

export default AdminLayout;
