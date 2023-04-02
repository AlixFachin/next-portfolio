import FadeIn from "./fadein";
import Link from "next/link";

function displayTagsWithBadges(tagsString: string) {
  const tagArray = tagsString.split(",");
  return (
    <div className="flex flex-wrap">
      {tagArray.map((tag, idx) => (
        <FadeIn direction="from-left" delay={200 + idx * 100} key={tag.trim()}>
          <div
            className="bg-orange-400/50 rounded-lg p-2 mr-2 mb-2 text-sm min-w-[80px] text-center"
            data-tag={tag.trim()}
          >
            {tag.trim()}
          </div>
        </FadeIn>
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
      <h2>ABOUT ME</h2>

      <div className="bio-container">
        <FadeIn direction="from-right" delay={200}>
          <div className="bio-text">
            <p>
              {" "}
              After graduating from college majoring in applied maths and
              computer science (ENSIMAG), I worked in finance, trading equity
              derivatives in Asia and in New York for about 10 years.{" "}
            </p>
            <p>
              {" "}
              After leaving finance and coming back to Japan in 2012, I worked
              as a manager in a property management company in Niseko. During
              this time, I kept coding as a hobby, experimenting with Swift and
              Ruby. In 2021 I decided to go back to software development
              full-time and subscribed to an intensive coding bootcamp.{" "}
            </p>
            <p>
              {" "}
              Since August 2022 I work full-time for{" "}
              <a href="https://roomboss.com">RoomBoss</a>, a software company
              providing SAAS solutions for the hospitality industry, as a
              software engineer.
            </p>
            <p>
              {" "}
              I am fluent in French and English, and good enough in Japanese to
              work everyday in a 100% Japanese-speaking environment.{" "}
            </p>
          </div>
        </FadeIn>
      </div>
      <div className="skillSetList">
        <h3>Experienced with</h3>
        {displayTagsWithBadges(
          "JavaScript, React.js, Angular, Riot.js, Node.js, Sequelize, Python, Django, Git, Rust, Docker, GraphQL"
        )}
      </div>
      <div className="self-end">
        <FadeIn direction="none">
          <div className="self-end mt-4 bg-orange-300/60 rounded-lg p-2 text-lg">
            <Link href="/about">About me</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default BioSummary;
