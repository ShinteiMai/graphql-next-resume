import { profile as data } from '@data/json';
import { Layout } from '@components/UI';
import { Project } from '@components/Common';

const ProjectsPage = () => {
  return (
    <Layout className="pb-6">
      <h2 className="text-5xl font-medium hidden lg:block text-accents-2">
        Projects
      </h2>
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
    </Layout>
  );
};

export default ProjectsPage;
