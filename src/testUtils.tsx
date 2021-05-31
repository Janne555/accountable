import React from 'react'
import { DependencyProvider } from "./hooks/useDependencies";
import { Storage } from './types';
import { QueryClientProvider, QueryClient } from 'react-query'

function createContextWrapper(storageWorkerClient: Storage.API, queryClient: QueryClient = new QueryClient()) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <DependencyProvider storageWorkerClient={storageWorkerClient}>
          {children}
        </DependencyProvider>
      </QueryClientProvider>
    )
  }
}

export {
  createContextWrapper
}