import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Make sure this matches your server port

export default socket;
