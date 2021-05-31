namespace Storage {
  interface Options {
    start?: Date
    end?: Date
    rulesLogic?: import('json-logic-js').RulesLogic
  }

  type API = Omit<import('../workers/storageWorkerAPI').default, 'database'>
}

export {
  Storage
}