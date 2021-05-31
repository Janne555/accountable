namespace Storage {
  interface Options {
    start?: Date
    end?: Date
    rulesLogic?: import('json-logic-js').RulesLogic
  }

  type API = import('../workers/storageWorker').default
}

export {
  Storage
}