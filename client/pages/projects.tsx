import Project from "../components/Common/Project";
import Container from "../components/UI/Container";
import data from "../data/profile.json";

const ProjectsPage = () => {
  return (
    <Container className="pb-6">
      <Container className="mt-2 lg:mt-6">
        {data.projects.map((p, index) => (
          <Project
            key={`project-${index}`}
            src={p.src}
            title={p.title}
            description={p.description}
            technologies={p.technologies}
            links={p.links}
            className="mb-10"
          />
        ))}
      </Container>
    </Container>
  );
};

export default ProjectsPage;
