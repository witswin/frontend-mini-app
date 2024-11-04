import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./useAuthorization";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState(null);
  const authInfo = useAuth();

  useEffect(() => {
    let socketUrl = url;
    if (authInfo.token) {
      socketUrl += `?auth=${authInfo.token}`;
    }
    const socketIo = io(process.env.NEXT_PUBLIC_WS_URL + socketUrl);

    setSocket(socketIo);
    return () => {
      if (socketIo) socketIo.disconnect();
    };
  }, [authInfo.token, url]);

  return socket;
};
