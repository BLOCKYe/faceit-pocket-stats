'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IProvidersProps {
  children: ReactNode;
}

const ReactQueryProviders: React.FC<IProvidersProps> = (props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {props.children}
    </QueryClientProvider>
  );
};

export default ReactQueryProviders;
