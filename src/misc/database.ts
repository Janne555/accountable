import { IEvent, IRecurringEvent } from "../types"
import Dexie from 'dexie'
import { RecurringEvent } from "../models"

class Database extends Dexie {
  events: Dexie.Table<IEvent, number>
  recurringEvents: Dexie.Table<IRecurringEvent, number>

  constructor () {
      super("database")
      this.version(1).stores({
        events: '++id, date, type, categories',
        recurringEvents: '++id'
      })
      this.events = this.table("events")
      this.recurringEvents = this.table("recurringEvents")
      this.recurringEvents.mapToClass(RecurringEvent)
  }
}

export default Database