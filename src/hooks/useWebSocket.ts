import { WebSocketContext } from "@/context/WebSocket";
import { useContext } from "react";

export const useWebSocket = () => useContext(WebSocketContext);
