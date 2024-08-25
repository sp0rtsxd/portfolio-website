export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: "project1",
    title: "Project 1",
    description: "A short description of Project 1",
    image: "/images/project1.jpg",
    longDescription: "A longer description of Project 1...",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "project2",
    title: "Project 2",
    description: "A short description of Project 2",
    image: "/images/project2.jpg",
    longDescription: "A longer description of Project 2...",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
  },
  // Add more projects as needed
];
