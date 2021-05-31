import { makeSchedule } from "../factories"
import { IEvent, Callback, Storage, IRecurringEvent, Database } from "../types"
import jsonLogic from 'json-logic-js'

class StorageWorkerAPI {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  getEvents(opts: Storage.Options, cb: Callback<IEvent[]>) {
    this._getEvents(opts)
      .then(events => cb(null, events))
      .catch(error => cb(error))
  }

  private async _getEvents(opts: Storage.Options): Promise<IEvent[]> {
    const { start, end, rulesLogic } = opts
    const historicalEvents = await this._getHistoricalEvents(opts)
    let allEvents = historicalEvents

    if (start && end) {
      const recurringEvents = await this._getRecurringEvents(opts)
      const generatedEvents = recurringEvents.flatMap(rEvent => rEvent.generateEventsBetween(start, end))
      if (rulesLogic) {
        allEvents = allEvents.concat(generatedEvents.filter(event => jsonLogic.apply(rulesLogic, event)))
      } else {
        allEvents = allEvents.concat(generatedEvents)
      }
    }

    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime())

    return allEvents
  }

  getHistoricalEvents(opts: Storage.Options, cb: Callback<IEvent[]>) {
    this._getHistoricalEvents(opts)
      .then(events => cb(null, events))
      .catch(error => cb(error))
  }

  private _getHistoricalEvents({ end, start, rulesLogic }: Storage.Options): Promise<IEvent[]> {
    let collection = this.database.events.toCollection()

    if (start) {
      collection = collection.filter(event => event.date.getTime() >= start.getTime())
    }

    if (end) {
      collection = collection.filter(event => event.date.getTime() < end.getTime())
    }

    if (rulesLogic) {
      collection = collection.filter(event => jsonLogic.apply(rulesLogic, event))
    }

    return collection
      .sortBy("date")
  }

  putHistoricalEvents(events: IEvent[], cb: Callback<void>) {
    this.database.events.bulkPut(events)
      .then(() => cb(null))
      .catch(error => cb(error))
  }

  deleteHistoricalEvents(ids: number[], cb: Callback<void>) {
    this.database.events.bulkDelete(ids)
      .then(() => cb(null))
      .catch(error => cb(error))
  }

  getRecurringEvents(opts: Storage.Options, cb: Callback<IRecurringEvent[]>) {
    this._getRecurringEvents(opts)
      .then(rEvents => cb(null, rEvents))
      .catch(error => cb(error))
  }

  /**
   * gets the recurring events and formats them to classes
   */
  private _getRecurringEvents(opts: Storage.Options): Promise<IRecurringEvent[]> {
    const collection = this.database.recurringEvents.toCollection()

    return collection
      .sortBy("date")
      .then(rEvents => {
        rEvents.forEach(rEvent => {
          rEvent.schedules = rEvent.schedules.map(schedule => makeSchedule(schedule.dayOf, schedule.type))
        })

        return rEvents
      })
  }

  putRecurringEvents(rEvents: IRecurringEvent[], cb: Callback<void>) {
    this.database.recurringEvents.bulkPut(rEvents)
      .then(() => cb(null))
      .catch(error => cb(error))
  }

  deleteRecurringEvents(ids: number[], cb: Callback<void>) {
    this.database.recurringEvents.bulkDelete(ids)
      .then(() => cb(null))
      .catch(error => cb(error))
  }
}

export default StorageWorkerAPI