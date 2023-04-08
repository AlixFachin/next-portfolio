import StdLayout from "@/components/stdlayout";
import Link from "next/link";
import getPageData, { StaticPageData } from "@/lib/staticPages";

export default function Custom404(pageData: StaticPageData) {
  return (
    <StdLayout>
      <h1 className="text-orange-300 font-title text-center text-5xl mb-4">
        You seem lost!
      </h1>
      <p className="mb-4">
        Because, after all, it is &quot;Code and Pastries&quot;, here is an
        actual recipe of custard to soothe your pain. Or you can{" "}
        <span className="text-orange-300 underline">
          <Link href="/">go back to the home page</Link>
        </span>
      </p>

      <article
        className="mt-8 prose 
            max-w-none 
            prose-headings:text-orange-200
            prose-strong:text-orange-200/90
            prose-ul:mt-3
            "
      >
        <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
      </article>
      <div className="mb-4 p-4 text-orange-300 underline">
        <Link href="/">Back to the home page</Link>
      </div>
    </StdLayout>
  );
}

export const getStaticProps = async () => {
  const pageData = await getPageData("404", "en");
  return {
    props: {
      ...pageData,
    },
  };
};
