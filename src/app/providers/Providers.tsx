"use client";

import Loading from "@/components/ui/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
      <Toaster />
    </QueryClientProvider>
  );
}