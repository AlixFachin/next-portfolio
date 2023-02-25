import StdLayout from "@/components/stdlayout";
import { NextPage } from "next";

// TODO: Work on the schedule components:
// Animation regarding a timeline?
// Making different chapters?

const About: NextPage = () => {
  return (
    <StdLayout>
      <main className="container max-w-3xl min-h-screen mx-auto px-4 py-12 bg-white/25 backdrop-blur-sm rounded-t-lg">
        <h1>This is me</h1>
        <p>
          And this is a text inside which describes what I did with my life.
        </p>
      </main>
    </StdLayout>
  );
};

export default About;
