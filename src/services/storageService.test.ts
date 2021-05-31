import { makeRecurringEvent } from "../factories";
import { IEvent, IRecurringEvent, Storage } from "../types";
import StorageService from "./storageService";

describe('storageService', () => {
  const event: IEvent = {
    amount: 0,
    categories: [],
    date: new Date(),
    id: 0,
    type: "historical",
    description: "hello"
  }

  const recurringEvent: IRecurringEvent = makeRecurringEvent([], { ...event, type: "archetype" })

  const getEvents = jest.fn()
  const getHistoricalEvents = jest.fn()
  const getRecurringEvents = jest.fn()
  const putHistoricalEvents = jest.fn()
  const deleteHistoricalEvents = jest.fn()
  const putRecurringEvents = jest.fn()
  const deleteRecurringEvents = jest.fn()

  const mockWorkerApi: Storage.API = {
    getEvents,
    getHistoricalEvents,
    getRecurringEvents,
    putHistoricalEvents,
    deleteHistoricalEvents,
    putRecurringEvents,
    deleteRecurringEvents
  } as any

  const storageService = new StorageService(mockWorkerApi)

  describe('getting events', () => {
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

  describe('historical events', () => {
    it('should return them', async () => {
      getHistoricalEvents.mockImplementation((opts, cb) => {
        cb(null, [event])
      })

      await expect(storageService.getHistoricalEvents()).resolves.toMatchObject([event])
    });

    it('should handle error for get', async () => {
      getHistoricalEvents.mockImplementation((opts, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.getHistoricalEvents()).rejects.toThrowError("failored")
    });

    it('should put them', async () => {
      await expect(storageService.putHistoricalEvents([])).resolves.toBeUndefined()
      expect(putHistoricalEvents).toHaveBeenCalledWith([])
    });

    it('should handle error for put', async () => {
      putHistoricalEvents.mockImplementation((events, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.putHistoricalEvents([])).rejects.toThrowError("failored")
    });

    it('should delete them', async () => {
      await expect(storageService.deleteHistoricalEvents([1])).resolves.toBeUndefined()
      expect(deleteHistoricalEvents).toHaveBeenCalledWith([1])
    });

    it('should handle error for delete', async () => {
      deleteHistoricalEvents.mockImplementation((ids, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.deleteHistoricalEvents([])).rejects.toThrowError("failored")
    });
  });

  describe('recurring events', () => {
    it('should return them', async () => {
      getRecurringEvents.mockImplementation((opts, cb) => {
        cb(null, [recurringEvent])
      })

      await expect(storageService.getRecurringEvents()).resolves.toMatchObject([recurringEvent])
    });

    it('should handle error for get', async () => {
      getRecurringEvents.mockImplementation((opts, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.getRecurringEvents()).rejects.toThrowError("failored")
    });

    it('should put them', async () => {
      await expect(storageService.putRecurringEvents([])).resolves.toBeUndefined()
      expect(putRecurringEvents).toHaveBeenCalledWith([])
    });

    it('should handle error for put', async () => {
      putRecurringEvents.mockImplementation((rEvents, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.putRecurringEvents([])).rejects.toThrowError("failored")
    });

    it('should delete them', async () => {
      await expect(storageService.deleteRecurringEvents([1])).resolves.toBeUndefined()
      expect(deleteRecurringEvents).toHaveBeenCalledWith([1])
    });

    it('should handle error for delete', async () => {
      deleteRecurringEvents.mockImplementation((ids, cb) => {
        cb(new Error("failored"))
      })

      await expect(storageService.deleteRecurringEvents([])).rejects.toThrowError("failored")
    });
  });
});