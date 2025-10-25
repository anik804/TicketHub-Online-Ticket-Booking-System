"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@/providers/ThemeProvider";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
