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

  putHistoricalEvents(events: IEvent[]): Promise<void> {
    return Promise.reject()
  }

  deleteHistoricalEvents(ids: number[]): Promise<void> {
    return Promise.reject()
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

  putRecurringEvents(rEvents: IRecurringEvent[]): Promise<void> {
    return Promise.reject()
  }

  deleteRecurringEvents(ids: number[]): Promise<void> {
    return Promise.reject()
  }

}

export default StorageService