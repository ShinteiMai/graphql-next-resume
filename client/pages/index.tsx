import data from "../data/profile.json";
import { technologies } from "../data/technologies.json";

import TextLink from "../components/UI/TextLink";
import Experience from "../components/Common/Experience";
import Technology from "../components/Common/Technology";

const IndexPage = () => {
  return (
    <div className="w-full lg:w-8/12">
      <div className="mt-0 md:mt-4 lg:mt-6">
        <h1 className="text-xl font-medium">Biography</h1>
        <p className="mt-3">
          Hi! I’m Steven Hansel. A software engineer based in Jakarta,
          Indonesia.
        </p>
        <p className="mt-3">
          I enjoy building software such as web & mobile applications with the
          most modern & latest technology available. My purpose is to create
          robust software following software engineering principles & best
          practices.
        </p>
        <p className="mt-3">
          I’m currently studying Computer Engineering in{" "}
          <TextLink href={data.links.binus} newTab className="text-primary">
            BINUS University
          </TextLink>{" "}
          as a sophomore. I started my development journey by getting into an
          internship in an Indonesian startup,{" "}
          <TextLink href={data.links.kotakode} newTab className="text-primary">
            Kotakode
          </TextLink>
          .
        </p>
        <div className="mt-8">
          <h1 className="text-xl font-medium mb-5">Experience</h1>
          <Experience />
        </div>

        <div className="mt-8">
          <h1 className="text-xl font-medium">Stacks</h1>
          <div className="grid grid-cols-4 lg:grid-cols-8 mt-4 gap-y-6">
            {technologies.map(({ id, thumbnail, title, link }) => (
              <Technology
                src={thumbnail}
                title={title}
                link={link}
                key={id}
                className="mr-3"
                width={50}
                height={50}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
