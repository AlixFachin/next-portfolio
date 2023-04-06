import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const copyright = `copyright Alix Fachin ${dayjs().year()}`;

  return (
    <footer className="relative py-4">
      <div className="absolute h-full w-full bottom-0 left-0 -z-20 bg-blue-400">
        {/* <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 330"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
        >
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="50%" x2="100%" y2="50%">
              {
                // #bfd8bd, #77bfa3
              }
              <stop offset="5%" stopColor="#0496FF"></stop>
              <stop offset="95%" stopColor="#006BA6"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,330 
          C 0,330 0,80 0,130
          C 119,73 238,67 363,77 
          C 487,86 616,112 748,94 
          C 879,75 1012,10 1128,0 
          C 1244,-10 1341,36 1440,80 
          C 1440,80 1440,330 1440,330 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient2)"
            fillOpacity="1"
          ></path>
        </svg> */}
      </div>
      <div className="flex flex-col items-center justify-end h-full text-sm pb-2 text-white/90 italic">
        <div className="flex items-center justify-center mb-3 py-1">
          <div className="mr-8"> {copyright} </div>
          <div className="w-[20px] hover:text-orange-400 mr-5">
            <a
              href="https://www.linkedin.com/in/alix-fachin/"
              aria-label="My LinkedIn Page"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <div className="w-[20px] hover:text-orange-400">
            <a href="https://github.com/AlixFachin" aria-label="My GitHub page">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
        <p className="text-center">
          Realized with love, sweat and coffee (maybe in a different order)
          using <a href="https://nextjs.org">Next.js</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
