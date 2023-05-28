import Link from "next/link";
import { fb_logOut } from "@/lib/firebase";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import LogoutButton from "./CRM/LogoutButton";

type NavLink = {
  id: number;
  href: string;
  label: string;
};

const AdminHeader = () => {
  const fbApp = useContext(FirebaseAppContext);
  const firebaseAuth = getAuth(fbApp);

  const navLinks: NavLink[] = [
    {
      id: 0,
      href: "/",
      label: "Home",
    },
    {
      id: 1,
      href: "/admin",
      label: "Posts Dashboard",
    },
    {
        id: 2,
        href: "/admin/pageList",
        label: "Pages Dashboard",
    }
  ];

  return (
    <header>
      <div className="absolute top-0 left-0 -z-10 w-full">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 600"
          xmlns="http://www.w3.org/2000/svg"
          className="transition delay-150 duration-300 ease-in-out"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#86A5D9"></stop>
              <stop offset="95%" stopColor="#0496FF"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,600 C 0,600 0,200 0,200 C 106.27751196172247,176.0956937799043 212.55502392344494,152.19138755980862 291,167 C 369.44497607655506,181.80861244019138 420.0574162679426,235.33014354066984 527,227 C 633.9425837320574,218.66985645933016 797.2153110047846,148.488038277512 917,146 C 1036.7846889952154,143.511961722488 1113.0813397129186,208.7177033492823 1193,229 C 1272.9186602870814,249.2822966507177 1356.4593301435407,224.64114832535887 1440,200 C 1440,200 1440,600 1440,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="0.53"
            className="path-0 transition-all delay-150 duration-300 ease-in-out"
            transform="rotate(-180 720 300)"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#ff6900"></stop>
              <stop offset="95%" stopColor="#fcb900"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,600 C 0,600 0,400 0,400 C 75.23444976076553,425.92344497607655 150.46889952153106,451.8468899521531 260,464 C 369.53110047846894,476.1531100478469 513.3588516746412,474.53588516746413 629,472 C 744.6411483253588,469.46411483253587 832.0956937799042,466.00956937799043 912,446 C 991.9043062200958,425.99043062200957 1064.2583732057417,389.4258373205741 1151,379 C 1237.7416267942583,368.5741626794259 1338.870813397129,384.2870813397129 1440,400 C 1440,400 1440,600 1440,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="1"
            className="path-1 transition-all delay-150 duration-300 ease-in-out"
            transform="rotate(-180 720 300)"
          ></path>
        </svg>
      </div>
      {
        // Navbar header
      }
      <div className="fixed top-0 left-0 z-10 flex h-12 w-screen items-center  justify-start bg-gradient-to-r from-blue-300 to-blue-200 px-4">
        {navLinks.map((navItem) => (
          <div key={navItem.id} className="mr-8 min-w-fit hover:text-orange-200">
            <Link href={navItem.href}>{navItem.label}</Link>
          </div>
        ))}
        <div className="flex-grow"></div>
        <div className="mr-4 rounded-md bg-white/30 px-2 ">
          {firebaseAuth.currentUser?.displayName}
        </div>
        <LogoutButton />
        {/* <div className="mr-8">🇺🇸</div> */}
      </div>
    </header>
  );
};

export default AdminHeader;
