import Header from "./header";
import Footer from "./footer";

export interface LayoutProps {
  children?: React.ReactNode;
}

const StdLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="container max-w-3xl mx-auto mt-[10vh] px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <div>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default StdLayout;
