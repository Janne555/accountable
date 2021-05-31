import { IEvent, Storage } from "../types";
import StorageService from "./storageService";

describe('storageService', () => {
  const event: IEvent = {
    amount: 0,
    categories: [],
    date: new Date(),
    id: 0,
    type: "historical"
  }

  const mockGetEvents = jest.fn()

  const mockWorkerApi: Storage.API = {
    getEvents: mockGetEvents
  }

  const storageService = new StorageService(mockWorkerApi)

  it('should return events', async () => {
    mockGetEvents.mockImplementation((opts, cb) => {
      cb(null, [event])
    })

    await expect(storageService.getEvents(new Date(), new Date())).resolves.toMatchObject([event])
  });

  it('should handle error', async () => {
    mockGetEvents.mockImplementation((opts, cb) => {
      cb(new Error("failored"))
    })

    await expect(storageService.getEvents(new Date(), new Date())).rejects.toThrowError("failored")
  });
});