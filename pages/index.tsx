import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("../components/ChatComponent"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-space-dark text-space-light">
      <Head>
        <title>My Space Portfolio</title>
        <meta
          name="description"
          content="Welcome to my space-themed portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to My Space Portfolio
        </motion.h1>

        <motion.p
          className="text-xl mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Explore the cosmic wonders of my projects and skills.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-space-light bg-opacity-10 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-space-accent">
              About Me
            </h2>
            <p>
              I'm a passionate developer exploring the frontiers of web
              technology, constantly pushing the boundaries of what's possible
              in the digital universe.
            </p>
          </div>
          <div className="bg-space-light bg-opacity-10 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-space-accent">
              Skills
            </h2>
            <ul className="list-disc list-inside">
              <li>React & Next.js</li>
              <li>Node.js & Express</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Socket.io</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-space-accent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Stellar Website", "Galactic App", "Nebula Database"].map(
              (project, index) => (
                <div
                  key={index}
                  className="bg-space-light bg-opacity-10 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{project}</h3>
                  <p>
                    A brief description of the {project.toLowerCase()} project
                    goes here.
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-space-accent">
            Contact
          </h2>
          <p className="text-center mb-4">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-space-accent hover:text-space-light transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-space-accent hover:text-space-light transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-space-accent hover:text-space-light transition-colors"
            >
              Twitter
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-space-accent">
            Space Chat
          </h2>
          <ChatComponent />
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
