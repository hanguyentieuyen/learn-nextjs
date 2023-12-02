"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface ProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
