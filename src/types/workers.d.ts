namespace Storage {
  interface Options {
    start?: Date
    end?: Date
  }

  type API = import('../workers/storageWorker').default
}

export {
  Storage
}