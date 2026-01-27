"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
// import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Providers from "./Providers";

const Client = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Toaster />
        <main>
             {children}
        </main>
      </Providers>
    </QueryClientProvider>
  );
};

export default Client;
