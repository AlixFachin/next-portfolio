import { useContext, useEffect, useState } from "react";

import { FirebaseUserContext } from "@/contexts/fbUserProvider";
import Link from "next/link";
import LoginScreen from "./login";

import LogoutButton from "./LogoutButton";

type PageMetaData = {
  title: string;
  slug: string;
};

const pageList: PageMetaData[] = [
  {
    title: "404 Page",
    slug: "404",
  },
  {
    title: "About me",
    slug: "aboutme",
  },
  {
    title: "ShortBio",
    slug: "shortbio",
  },
];

const localesList = ["en", "ja"];

const AdminPageList = () => {
  const user = useContext(FirebaseUserContext);
  const [error, setError] = useState<string>("");

  if (!user) {
    return (
      <div>
        <p>
          You are not logged in!
          <br />
          Please authenticate
        </p>
        <LoginScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>
          Error during data download!
          <br />
          Please logout and try again...
        </p>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl flex-col bg-white/80 p-4">
      <h1 className="mb-4 border-b-2 border-orange-300 pb-2 font-title text-4xl text-blue-400">
        List of Static Pages
      </h1>
      <div className="flex flex-col">
        {pageList.map((pageData,index) => (
          <div className="flex items-center" key={index}>
            <h2 className="py-2 font-title text-xl text-blue-400">
              {pageData.title}
            </h2>
            <div className="flex-grow"></div>
            {localesList.map((locale) => (
              <div className="text-center px-2 mx-4" key={locale}>
                <Link href={`/admin/editPage/${pageData.slug}/${locale}`} > {locale}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPageList;
