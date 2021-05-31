import React from 'react'
import StorageService from '../services/storageService'
import storageWorkerClient from '../workers/storageWorkerClient'

type DependencyContext = {
  storageService: StorageService
}

const dependencyContext = React.createContext<DependencyContext>({} as DependencyContext)

function DependencyProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { current: storageService } = React.useRef(new StorageService(storageWorkerClient))

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