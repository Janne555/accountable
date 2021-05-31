import { IEvent, IRecurringEvent, StorageWorkerAPI } from "../types";

class StorageService {
  private workerApi: StorageWorkerAPI

  constructor(workerApi: StorageWorkerAPI) {
    this.workerApi = workerApi
  }

  getEvents(start: Date, end: Date): Promise<IEvent> {
    return Promise.reject()
  }

  getHistoricalEvents(start: Date, end: Date): Promise<IEvent[]> {
    return Promise.reject()
  }

  getRecurringEvents(): Promise<IRecurringEvent[]> {
    return Promise.reject()
  }
}

export default StorageService