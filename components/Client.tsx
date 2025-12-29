"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Client = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </Provider>
    </QueryClientProvider>
  );
};

export default Client;
