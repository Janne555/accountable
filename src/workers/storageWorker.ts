import { IEvent, Callback, Storage, IRecurringEvent, Database } from "../types"

class StorageWorker {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  getEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {

  }

  getHistoricalEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {
  }

  getRecurringEvents({ }: Storage.Options, cb: Callback<IRecurringEvent[]>) {

  }
}

export default StorageWorker