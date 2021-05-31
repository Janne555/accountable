namespace Storage {
  interface Options {
    start?: Date
    end?: Date
  }

  type API = typeof import('../workers/storageWorker').default
}

export {
  Storage
}