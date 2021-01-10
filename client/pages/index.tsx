import { Experience, Technology } from "@components/Common";
import { TextLink } from "@components/UI";
import { profile, technologies } from "@data/json";

const IndexPage = () => {
  return (
    <div>
      <div className="mt-0 md:mt-4 lg:mt-6">
        <h2 className="text-xl font-medium text-accents-2">Biography</h2>
        <p className="mt-3 text-accents-1 text-sm">
          Hi! I’m Steven Hansel. A software engineer based in Jakarta,
          Indonesia.
        </p>
        <p className="mt-3 text-accents-1 text-sm">
          I enjoy building software such as web & mobile applications with the
          most modern & latest technology available. My purpose is to create
          robust software following software engineering principles & best
          practices.
        </p>
        <p className="mt-3 text-accents-1 text-sm">
          I’m currently studying Computer Engineering in{" "}
          <TextLink href={profile.links.binus} newTab className="text-primary">
            BINUS University
          </TextLink>{" "}
          as a sophomore. I started my development journey by getting into an
          internship in an Indonesian startup,{" "}
          <TextLink
            href={profile.links.kotakode}
            newTab
            className="text-primary"
          >
            Kotakode
          </TextLink>
          .
        </p>
        <div className="mt-8">
          <h2 className="text-xl text-accents-2 font-medium mb-5">
            Experience
          </h2>
          <Experience />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium text-accents-2">Stacks</h2>
          <div className="grid grid-cols-4 lg:grid-cols-8 mt-4 gap-y-6">
            {technologies.technologies.map(({ id, thumbnail, title, link }) => (
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
