import React from 'react'
import StorageService from '../services/storageService'
import StorageWorkerAPI from '../workers/storageWorkerAPI'

type DependencyContext = {
  storageService: StorageService
}

const dependencyContext = React.createContext<DependencyContext>({} as DependencyContext)

type Props = {
  children: React.ReactNode
  storageWorkerClient: StorageWorkerAPI
}

function DependencyProvider({ children, storageWorkerClient }: Props): JSX.Element {
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