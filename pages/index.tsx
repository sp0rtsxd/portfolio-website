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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
              technology.
            </p>
          </div>
          <div className="bg-space-light bg-opacity-10 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-space-accent">
              My Projects
            </h2>
            <ul className="list-disc list-inside">
              <li>Stellar Website</li>
              <li>Galactic App</li>
              <li>Nebula Database</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
