import { useAuth } from "@/hooks/useAuthorization";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

export const WebSocketContext = createContext(undefined);

interface WebSocketProviderProps extends PropsWithChildren {}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [ping, setPing] = useState(-1);
  const { query } = useRouter();
  const quizId = query?.id;
  const socket = useRef({ client: null as WebSocket | null });
  const authInfo = useAuth();
  useEffect(() => {
    let isMounted = !!quizId;

    let interval: NodeJS.Timeout | undefined;
    let reconnectTimeout: NodeJS.Timeout | undefined;
    let previousPing: Date | null = null;

    const initializeWebSocket = () => {
      if (!isMounted) return;

      let socketUrl =
        process.env.NEXT_PUBLIC_WS_URL! + "/ws/quiz/" + quizId + "/";

      if (authInfo) socketUrl += `?auth=${authInfo.token}`;

      socket.current.client = new WebSocket(socketUrl);

      socket.current.client.onopen = () => {
        previousPing = new Date();
        socket.current.client?.send(JSON.stringify({ command: "PING" }));
        interval = setInterval(() => {
          try {
            previousPing = new Date();
            socket.current.client?.send(JSON.stringify({ command: "PING" }));
          } catch (error) {
            reconnect();
            console.log(error);
          }
        }, 3000);
      };

      socket.current.client.onclose = () => {
        if (isMounted) reconnect();
        setPing(-1);
      };

      socket.current.client.onmessage = (e) => {
        if (e.data === "PONG") {
          const now = new Date();
          const timePassed = previousPing
            ? now.getTime() - previousPing.getTime()
            : -1;
          setPing(timePassed);
        }
      };
    };

    const reconnect = () => {
      if (interval) clearInterval(interval); // Clear the existing interval before reconnecting
      if (reconnectTimeout) clearTimeout(reconnectTimeout); // Clear the existing timeout before setting a new one
      if (socket.current.client) {
        socket.current.client.onclose = () => {}; // Prevent the original onclose from firing during reconnect
        socket.current.client.close();
        socket.current.client = null;
      }

      reconnectTimeout = setTimeout(() => {
        if (isMounted) {
          initializeWebSocket();
        }
      }, 5000); // Wait 5 seconds before attempting to reconnect
    };

    initializeWebSocket(); // Initialize the WebSocket connection

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval); // Clean up the interval
      if (reconnectTimeout) clearTimeout(reconnectTimeout); // Clean up the reconnect timeout
      if (socket.current.client) {
        socket.current.client.onclose = () => {}; // Prevent the onclose from firing during cleanup
        socket.current.client.close();
        socket.current.client = null;
      }
    };
  }, [authInfo, quizId]);

  return (
    <WebSocketContext.Provider value={{ socket: socket, ping }}>
      {children}
    </WebSocketContext.Provider>
  );
};
