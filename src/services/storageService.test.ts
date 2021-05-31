import { makeRecurringEvent } from "../factories";
import { IEvent, IRecurringEvent, Storage } from "../types";
import StorageService from "./storageService";

describe('storageService', () => {
  const event: IEvent = {
    amount: 0,
    categories: [],
    date: new Date(),
    id: 0,
    type: "historical"
  }

  const recurringEvent: IRecurringEvent = makeRecurringEvent([], { ...event, type: "archetype" }, 0)

  const getEvents = jest.fn()
  const getHistoricalEvents = jest.fn()
  const getRecurringEvents = jest.fn()

  const mockWorkerApi: Storage.API = {
    getEvents,
    getHistoricalEvents,
    getRecurringEvents
  }

  const storageService = new StorageService(mockWorkerApi)

  describe('when getting events', () => {
    it('should return them', async () => {
      getEvents.mockImplementation((opts, cb) => {
        cb(null, [event])
      })

      await expect(storageService.getEvents()).resolves.toMatchObject([event])
    });

    it('should handle error', async () => {
      getEvents.mockImplementation((opts, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.getEvents()).rejects.toThrowError("failored")
    });
  });

  describe('when getting historical events', () => {
    it('should return them', async () => {
      getHistoricalEvents.mockImplementation((opts, cb) => {
        cb(null, [event])
      })

      await expect(storageService.getHistoricalEvents()).resolves.toMatchObject([event])
    });

    it('should handle error', async () => {
      getHistoricalEvents.mockImplementation((opts, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.getHistoricalEvents()).rejects.toThrowError("failored")
    });
  });

  describe('when getting recurring events', () => {
    it('should return them', async () => {
      getRecurringEvents.mockImplementation((opts, cb) => {
        cb(null, [recurringEvent])
      })

      await expect(storageService.getRecurringEvents()).resolves.toMatchObject([recurringEvent])
    });

    it('should handle error', async () => {
      getRecurringEvents.mockImplementation((opts, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.getRecurringEvents()).rejects.toThrowError("failored")
    });
  });
});