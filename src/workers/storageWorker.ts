import { IEvent, Callback, Storage, IRecurringEvent } from "../types"

const storageWorker = {
  getEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {

  },

  getHistoricalEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {
  },

  getRecurringEvents({ }: Storage.Options, cb: Callback<IRecurringEvent[]>) {

  }
}

export default storageWorker