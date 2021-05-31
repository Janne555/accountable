import { IEvent, IRecurringEvent, Storage } from "../types";

class StorageService {
  private workerApi: Storage.API

  constructor(workerApi: Storage.API) {
    this.workerApi = workerApi
  }

  getEvents(options: Storage.Options = {}): Promise<IEvent[]> {
    return new Promise<IEvent[]>((resolve, reject) => {
      this.workerApi.getEvents(options, (error, data) => {
        if (error) {
          reject(error)
        }

        if (data) {
          resolve(data)
        } else {
          resolve([])
        }
      })
    })
  }

  getHistoricalEvents(options: Storage.Options = {}): Promise<IEvent[]> {
    return new Promise<IEvent[]>((resolve, reject) => {
      this.workerApi.getHistoricalEvents(options, (error, data) => {
        if (error) {
          reject(error)
        }

        if (data) {
          resolve(data)
        } else {
          resolve([])
        }
      })
    })
  }

  getRecurringEvents(options: Storage.Options = {}): Promise<IRecurringEvent[]> {
    return new Promise<IRecurringEvent[]>((resolve, reject) => {
      this.workerApi.getRecurringEvents(options, (error, data) => {
        if (error) {
          reject(error)
        }

        if (data) {
          resolve(data)
        } else {
          resolve([])
        }
      })
    })
  }
}

export default StorageService