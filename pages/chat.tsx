import Layout from "../components/Layout";
import ChatComponent from "../components/ChatComponent";

export default function Chat() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mt-10">Live Chat</h1>
      <ChatComponent />
    </Layout>
  );
}
