import { IEvent, IRecurringEvent, Storage } from "../types";

class StorageService {
  private workerApi: Storage.API

  constructor(workerApi: Storage.API) {
    this.workerApi = workerApi
  }

  getEvents({}: Storage.Options = {}): Promise<IEvent> {
    return Promise.reject()
  }

  getHistoricalEvents({}: Storage.Options = {}): Promise<IEvent[]> {
    return Promise.reject()
  }

  getRecurringEvents(): Promise<IRecurringEvent[]> {
    return Promise.reject()
  }
}

export default StorageService