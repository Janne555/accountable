import Database from "../misc/database";
import { IEvent } from "../types";
import StorageWorker from "../workers/storageWorker";
import StorageService from "./storageService";

describe('storageWorker', () => {
  const db = new Database()
  const storageWorker = new StorageWorker(db)
  const storageService = new StorageService(storageWorker)

  const event: IEvent = { amount: 0, categories: [], date: new Date("2020-01-01T00:00"), type: "historical" }
  const event2: IEvent = { amount: 0, categories: [], date: new Date("2020-02-01T00:00"), type: "historical" }
  const event3: IEvent = { amount: 0, categories: [], date: new Date("2020-01-03T00:00"), type: "historical" }
  const event4: IEvent = { amount: 0, categories: [], date: new Date("2004-01-01T00:00"), type: "historical" }

  describe('when getting historical events', () => {
    beforeEach(async () => {
      db.events.bulkAdd([event, event2, event3, event4])
    })

    afterEach(async () => {
      await db.events.clear()
      await db.recurringEvents.clear()
    })

    it('should get them', async () => {
      await expect(storageService.getHistoricalEvents()).resolves.toMatchObject([event, event2, event3, event4])
    });

    it('should filter by start date', async () => {
      await expect(storageService.getHistoricalEvents({ start: new Date("2020-01-01T00:00") })).resolves.toMatchObject([event, event2, event3])
    });

    it('should filter by end date', async () => {
      await expect(storageService.getHistoricalEvents({ end: new Date("2020-01-01T00:00") })).resolves.toMatchObject([event4])
    });

    it('should filter by start and end date', async () => {
      await expect(storageService.getHistoricalEvents({ start: new Date("2020-01-01T00:00"), end: new Date("2020-01-04T00:00") }))
        .resolves.toMatchObject([event, event3])
    });
  });
});