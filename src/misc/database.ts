import { IEvent, IRecurringEvent } from "../types"
import Dexie from 'dexie'

class Database extends Dexie {
  events: Dexie.Table<IEvent, number>
  recurringEvents: Dexie.Table<IRecurringEvent, number>

  constructor () {
      super("database")
      this.version(1).stores({
        events: '++id, date, type',
        recurringEvents: '++id'
      })
      this.events = this.table("events")
      this.recurringEvents = this.table("recurringEvents")
  }
}

export default Database