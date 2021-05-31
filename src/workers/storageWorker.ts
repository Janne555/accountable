import { IEvent, Callback, Storage, IRecurringEvent, Database } from "../types"

class StorageWorker {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  getEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {

  }

  getHistoricalEvents({ end, start }: Storage.Options, cb: Callback<IEvent[]>) {
    let collection = this.database.events.toCollection()

    if (start) {
      collection = collection.filter(event => event.date.getTime() >= start.getTime())
    }

    if (end) {
      collection = collection.filter(event => event.date.getTime() < end.getTime())
    }

    collection.toArray()
      .then(events => cb(null, events))
      .catch(error => cb(error))
  }

  getRecurringEvents(opts: Storage.Options, cb: Callback<IRecurringEvent[]>) {
    let collection = this.database.recurringEvents.toCollection()

    collection.toArray()
      .then(rEvents => cb(null, rEvents))
      .catch(error => cb(error))
  }
}

export default StorageWorker