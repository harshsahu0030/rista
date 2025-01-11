import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { AuthUserProvider } from "./context/AuthUser.jsx";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthUserProvider>
          <Toaster />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthUserProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
