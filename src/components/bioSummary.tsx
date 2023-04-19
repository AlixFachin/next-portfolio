import FadeIn from "./fadein";
import Link from "next/link";

function displayTagsWithBadges(tagsString: string) {
  const tagArray = tagsString.split(",");
  return (
    <div className="grid gap-2 grid-cols-4 md:grid-cols-6 md:py-4">
      {tagArray.map((tag, idx) => (
        <div
          className="bg-orange-400 rounded-lg p-2 mr-2 mb-2 text-sm min-w-[80px] text-center"
          data-tag={tag.trim()}
          key={idx}
        >
          {tag.trim()}
        </div>
      ))}
    </div>
  );
}

const BioSummary: React.FunctionComponent<{ extraClass?: string }> = ({
  extraClass,
}) => {
  return (
    <section
      className={`container max-w-3xl mx-auto px-4 py-12 bg-white/70 backdrop-blur-sm 
        rounded-t-lg flex flex-col items-center justify-start
        ${extraClass ? " " + extraClass : ""}`}
    >
      <div className="absolute t-0 -z-30">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g transform="translate(454.65868284581063 246.74790800021617)">
            <path
              d="M95.9 -121.5C131.9 -105.9 173.9
            -88 202.2 -53.3C230.5 -18.6 245.1 32.9 223.9
            64.9C202.7 97 145.7 109.6 102.4 145.5C59.2 181.4 29.6 240.7 -9.5 
            253.8C-48.6 266.9 -97.2 233.8 -131.3 194.8C-165.3 155.9 -184.9 111.2 -207.5 
            62.5C-230.2 13.8 -255.8 -38.8 -236.5 
            -70.1C-217.1 -101.4 -152.6 -111.4 -105.7 
            -123.5C-58.8 -135.6 -29.4 -149.8 0.3 -150.2C30
            -150.6 60 -137.2 95.9 -121.5"
              fill="#fcb900"
            ></path>
          </g>
        </svg>
      </div>
      <h2 className="font-title text-orange-300 text-5xl mb-4">
        <Link href="/about">About me</Link>
      </h2>

      <article className="bio-container bg-white/50">
        <FadeIn direction="from-left" delay={200}>
          <div className="bio-text">
            <p>Hi there!</p>
            <p>
              I am <span>Alix Fachin</span>, software developer working for{" "}
              <a href="https://roomboss.com">RoomBoss</a>, a software company
              providing SAAS solutions for the hospitality industry.
            </p>
            <p>
              {" "}
              I studied Computer Science in college, then went to work in
              finance, then worked in hospitality and am working in software
              development again!
            </p>
            <h3>Trivia Facts</h3>
            <p>
              <ul className="indent-4">
                <li>
                  Born in France, lived abroad since I graduated from college
                </li>
                <li>
                  Speaks French, English, Japanese. Studied German{" "}
                  <span>aber ich habe alles vergessen!</span>
                </li>
                <li>
                  The first game I played was "New Zealand Story" from Taito, on
                  an Amiga 500
                </li>
                <li>
                  The first time I coded seriously was on my scientific
                  calculator HP48SX in high school
                </li>
                <li>
                  The first video game I really finished was Final Fantasy X on
                  PS2
                </li>
                <li>My favourite game ever was The Last of Us II on PS4</li>
              </ul>
            </p>
          </div>
        </FadeIn>
      </article>
      <div className="skillSetList bg-white/50">
        <h3>Experienced with</h3>
        {displayTagsWithBadges(
          "JavaScript, React.js, Angular, Riot.js, Node.js, Sequelize, Python, Django, Git, Rust, Docker, GraphQL"
        )}
      </div>
      <div className="self-end">
        <FadeIn direction="none">
          <div className="self-end mt-4 bg-orange-300/60 rounded-lg p-2 px-4 text-lg shadow-md">
            <Link href="/about">More details</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default BioSummary;
