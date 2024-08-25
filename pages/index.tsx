import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-space-black text-space-white">
      <Head>
        <title>Your Name - Portfolio</title>
        <meta name="description" content="Your professional portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">Your Name</h1>
          <p className="text-2xl text-space-gray mb-8">
            Web Developer & Designer
          </p>
          <div className="flex justify-center space-x-4">
            <SocialIcon
              href="https://github.com/yourusername"
              icon={<FaGithub />}
            />
            <SocialIcon
              href="https://linkedin.com/in/yourusername"
              icon={<FaLinkedin />}
            />
            <SocialIcon
              href="https://twitter.com/yourusername"
              icon={<FaTwitter />}
            />
            <SocialIcon
              href="mailto:your.email@example.com"
              icon={<FaEnvelope />}
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <p className="text-lg mb-4">
            Hello! I'm a passionate web developer with a keen eye for design. I
            specialize in creating responsive, user-friendly websites and
            applications using modern technologies.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying the great
            outdoors.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Skill name="React" level={90} />
            <Skill name="Node.js" level={85} />
            <Skill name="TypeScript" level={80} />
            <Skill name="CSS/Tailwind" level={95} />
            <Skill name="GraphQL" level={75} />
            <Skill name="Python" level={70} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Project 1"
              description="A brief description of your first project."
              link="#"
            />
            <ProjectCard
              title="Project 2"
              description="A brief description of your second project."
              link="#"
            />
            <ProjectCard
              title="Project 3"
              description="A brief description of your third project."
              link="#"
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg mb-4">
            I'm always open to new opportunities and collaborations. Feel free
            to reach out if you'd like to work together!
          </p>
          <Link
            href="/chat"
            className="bg-space-purple hover:bg-space-pink text-space-white font-bold py-2 px-4 rounded transition-colors"
          >
            Chat with Me
          </Link>
        </motion.section>
      </main>
    </div>
  );
};

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({
  href,
  icon,
}) => (
  <a
    href={href}
    className="text-space-gray hover:text-space-white transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const Skill: React.FC<{ name: string; level: number }> = ({ name, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="w-full bg-space-blue rounded">
      <div
        className="bg-space-purple h-2 rounded"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const ProjectCard: React.FC<{
  title: string;
  description: string;
  link: string;
}> = ({ title, description, link }) => (
  <div className="bg-space-blue p-6 rounded-lg">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="mb-4">{description}</p>
    <a
      href={link}
      className="text-space-purple hover:text-space-pink transition-colors"
    >
      Learn More
    </a>
  </div>
);

export default Home;
