import Header from "./header";
import Footer from "./footer";

export interface LayoutProps {
  children?: React.ReactNode;
}

const StdLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="container min-h-[400px] max-w-3xl mx-auto mt-[10vh] pt-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default StdLayout;
