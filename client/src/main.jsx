import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthUserProvider } from "./context/AuthUser.jsx";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketProvider } from "./context/Socket.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthUserProvider>
        <SocketProvider>
          <Toaster />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </SocketProvider>
      </AuthUserProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
