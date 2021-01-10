import Project from "../components/Common/Project/Project";
import { profile as data } from "@data/json";

const ProjectsPage = () => {
  return (
    <div className="pb-6">
      <div className="mt-2 lg:mt-6">
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
      </div>
    </div>
  );
};

export default ProjectsPage;
