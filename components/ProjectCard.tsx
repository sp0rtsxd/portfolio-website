import React from "react";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
}) => {
  return (
    <div className="bg-space-blue rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
        <p className="text-space-white mb-4">{description}</p>
        <Link
          href={`/projects/${id}`}
          className="text-space-pink hover:text-space-purple transition-colors"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
