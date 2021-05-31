import React from 'react'
import { DependencyProvider } from "./hooks/useDependencies";
import { Storage } from './types';

function createContextWrapper(storageWorkerClient: Storage.API) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <DependencyProvider storageWorkerClient={storageWorkerClient}>
        {children}
      </DependencyProvider>)
  }
}

export {
  createContextWrapper
}