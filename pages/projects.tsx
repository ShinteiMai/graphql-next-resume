import Project from "../components/Common/Project";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import data from "../data/profile.json";

const ProjectsPage = () => {
  return (
    <Container>
      <Heading className="text-5xl font-medium hidden md:block mb-8">
        Projects
      </Heading>
      {data.projects.map((p, index) => (
        <Project
          key={`project-${index}`}
          src={p.src}
          title={p.title}
          description={p.title}
          technologies={p.technologies}
          links={p.links}
        />
      ))}
    </Container>
  );
};

export default ProjectsPage;
