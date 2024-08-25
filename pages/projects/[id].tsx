import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/Layout";
import { projects, Project } from "../../lib/projects";

interface ProjectPageProps {
  project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-display font-bold mb-8">
          {project.title}
        </h1>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <p className="text-lg mb-8">{project.longDescription}</p>
        <h2 className="text-2xl font-display font-bold mb-4">
          Technologies Used
        </h2>
        <ul className="list-disc list-inside mb-8">
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <a
          href="/"
          className="bg-space-purple hover:bg-space-pink text-space-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to Projects
        </a>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((p) => p.id === params?.id);

  return { props: { project } };
};

export default ProjectPage;
