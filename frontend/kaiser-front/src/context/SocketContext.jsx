import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthConrtext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      console.log("Initializing socket connection...");
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser._id, // Pass user ID as query
        },
      });

      setSocket(socket);

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("getOnlineUsers", (users) => {
        console.log("Online users received from server:", users);
        setOnlineUsers(users);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
      });

      return () => {
        console.log("Closing socket connection...");
        socket.close(); // Clean up on unmount
      };
    } else {
      if (socket) {
        console.log("Closing socket connection as no authUser...");
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
