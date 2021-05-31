import { IEvent, Callback, Storage, IRecurringEvent, Database } from "../types"

class StorageWorker {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  getEvents(opts: Storage.Options, cb: Callback<IEvent[]>) {

  }

  private _getEvents({ end, start }: Storage.Options): Promise<IEvent[]> {
    return Promise.reject("unimplemented")
  }

  getHistoricalEvents(opts: Storage.Options, cb: Callback<IEvent[]>) {
    this._getHistoricalEvents(opts)
      .then(events => cb(null, events))
      .catch(error => cb(error))
  }

  private _getHistoricalEvents({ end, start }: Storage.Options): Promise<IEvent[]> {
    let collection = this.database.events.toCollection()

    if (start) {
      collection = collection.filter(event => event.date.getTime() >= start.getTime())
    }

    if (end) {
      collection = collection.filter(event => event.date.getTime() < end.getTime())
    }

    return collection
      .sortBy("date")
  }

  getRecurringEvents(opts: Storage.Options, cb: Callback<IRecurringEvent[]>) {
    this._getRecurringEvents(opts)
      .then(rEvents => cb(null, rEvents))
      .catch(error => cb(error))
  }

  private _getRecurringEvents(opts: Storage.Options): Promise<IRecurringEvent[]> {
    let collection = this.database.recurringEvents.toCollection()

    return collection
      .sortBy("date")
  }
}

export default StorageWorker