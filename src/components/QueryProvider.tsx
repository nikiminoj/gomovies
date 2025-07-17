"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@/lib/react-query";

const client = createClient();

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;