import { NextPage } from "next";
import Layout from "../components/Layout";
import ChatComponent from "../components/ChatComponent";

const ChatPage: NextPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-display font-bold mb-8 text-center">
          Chat Room
        </h1>
        <ChatComponent />
      </div>
    </Layout>
  );
};

export default ChatPage;
