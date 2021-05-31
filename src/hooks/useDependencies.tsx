import React from 'react'
import StorageService from '../services/storageService'
import * as Comlink from 'comlink'
import { Storage } from '../types';

const storageWorker = new Worker(new URL('../workers/storageWorker.js', import.meta.url))

const storageWorkerAPI: Storage.API = Comlink.wrap(storageWorker) as any

type DependencyContext = {
  storageService: StorageService
}

const dependencyContext = React.createContext<DependencyContext>({} as any)

function DependencyProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { current: storageService } = React.useRef(new StorageService(storageWorkerAPI))

  return (
    <dependencyContext.Provider value={{
      storageService
    }}>
      {children}
    </dependencyContext.Provider>
  )
}

function useDependecies(): DependencyContext {
  const context = React.useContext(dependencyContext)
  if (!context) {
    throw Error("Missing dependency context")
  }

  return context
}

export {
  DependencyProvider,
  useDependecies
}