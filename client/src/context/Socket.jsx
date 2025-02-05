import { createContext, useEffect, useMemo } from "react";
import io from "socket.io-client";
import propTypes from "prop-types";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );
  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: propTypes.array,
};

export default SocketContext;
