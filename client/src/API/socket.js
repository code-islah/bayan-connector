import { io } from "socket.io-client";

export const socket = io("https://bayan-connector.onrender.com", {
  transports: ["websocket"],
});