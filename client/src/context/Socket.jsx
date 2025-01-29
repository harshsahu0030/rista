import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import propTypes from "prop-types";

const SocketContext = createContext();

const GetSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );


  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: propTypes.array,
};

export default GetSocket;
