import data from "../data/profile.json";
import { technologies } from "../data/technologies.json";

import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import Paragraph from "../components/UI/Paragraph";
import TextLink from "../components/UI/TextLink";
import Experience from "../components/Common/Experience";
import Technology from "../components/Common/Technology";

const IndexPage = () => {
  return (
    <Container>
      <Heading className="text-5xl font-medium hidden md:block">About</Heading>
      <Container className="mt-6">
        <Heading className="text-xl font-medium">Biography</Heading>
        <Paragraph className="mt-2">
          Hi! I’m Steven Hansel. A software engineer based in Jakarta,
          Indonesia.
        </Paragraph>
        <Paragraph className="mt-2">
          I enjoy building software such as web & mobile applications with the
          most modern & latest technology available. My purpose is to create
          robust software following software engineering principles & best
          practices.
        </Paragraph>
        <Paragraph className="mt-2">
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
        </Paragraph>
        <Container className="mt-8">
          <Heading className="text-xl font-medium mb-5">Experience</Heading>
          <Experience />
        </Container>

        <Container className="mt-8">
          <Heading className="text-xl font-medium">Stacks</Heading>
          <Container className="grid grid-cols-4 lg:grid-cols-8 mt-4 gap-y-6">
            {technologies.map(({ id, thumbnail, title }) => (
              <Technology
                src={thumbnail}
                title={title}
                key={id}
                className="mr-3"
                width={50}
                height={50}
              />
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default IndexPage;
