import * as Comlink from 'comlink'
import { Storage } from '../types';

const storageWorker = new Worker(new URL('./storageWorker', import.meta.url))

const comlinkAPI = Comlink.wrap<Storage.API>(storageWorker)

const storageWorkerClient: Storage.API = {
  getEvents: (opts, cb) => comlinkAPI.getEvents(opts, Comlink.proxy(cb)),
  getHistoricalEvents: (opts, cb) => comlinkAPI.getHistoricalEvents(opts, Comlink.proxy(cb)),
  putHistoricalEvents: (events, cb) => comlinkAPI.putHistoricalEvents(events, Comlink.proxy(cb)),
  deleteHistoricalEvents: (ids, cb) => comlinkAPI.deleteHistoricalEvents(ids, Comlink.proxy(cb)),
  getRecurringEvents: (opts, cb) => comlinkAPI.getRecurringEvents(opts, Comlink.proxy(cb)),
  putRecurringEvents: (events, cb) => comlinkAPI.putRecurringEvents(events, Comlink.proxy(cb)),
  deleteRecurringEvents: (ids, cb) => comlinkAPI.deleteRecurringEvents(ids, Comlink.proxy(cb))
}

export default storageWorkerClient