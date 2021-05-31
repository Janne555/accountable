import { makeRecurringEvent, makeSchedule } from "../factories";
import Database from "../misc/database";
import { RecurringEvent } from "../models";
import { IEvent, IRecurringEvent } from "../types";
import StorageWorker from "../workers/storageWorker";
import StorageService from "./storageService";

describe('storageWorker', () => {
  const db = new Database()
  const storageWorker = new StorageWorker(db)
  const storageService = new StorageService(storageWorker)

  const event: IEvent = { amount: 1, categories: [], date: new Date("2020-01-01T00:00"), type: "historical" }
  const event2: IEvent = { amount: 2, categories: [], date: new Date("2020-02-01T00:00"), type: "historical" }
  const event3: IEvent = { amount: 3, categories: [], date: new Date("2020-01-03T00:00"), type: "historical" }
  const event4: IEvent = { amount: 4, categories: [], date: new Date("2004-01-01T00:00"), type: "historical" }

  const recurringEvent: IRecurringEvent = makeRecurringEvent([makeSchedule(0, "weekly")], { amount: 5, categories: [], date: new Date("2020-01-01T00:00"), type: "archetype" })
  const recurringEvent2: IRecurringEvent = makeRecurringEvent([makeSchedule(1, "monthly")], { amount: 50, categories: ["asd"], date: new Date("2021-01-01T00:00"), type: "archetype" })

  describe('when getting historical events', () => {
    beforeEach(async () => {
      db.events.bulkAdd([event, event2, event3, event4])
    })

    afterEach(async () => {
      await db.events.clear()
      await db.recurringEvents.clear()
    })

    it('should get them', async () => {
      await expect(storageService.getHistoricalEvents()).resolves.toMatchObject([event4, event, event3, event2])
    });

    it('should filter by start date', async () => {
      await expect(storageService.getHistoricalEvents({ start: new Date("2020-01-01T00:00") })).resolves.toMatchObject([event, event3, event2])
    });

    it('should filter by end date', async () => {
      await expect(storageService.getHistoricalEvents({ end: new Date("2020-01-01T00:00") })).resolves.toMatchObject([event4])
    });

    it('should filter by start and end date', async () => {
      await expect(storageService.getHistoricalEvents({ start: new Date("2020-01-01T00:00"), end: new Date("2020-01-04T00:00") }))
        .resolves.toMatchObject([event, event3])
    });
  });

  describe('when getting recurring events', () => {
    beforeEach(async () => {
      db.recurringEvents.bulkAdd([recurringEvent, recurringEvent2])
    })

    afterEach(async () => {
      await db.events.clear()
      await db.recurringEvents.clear()
    })

    it('should get them', async () => {
      const result = await storageService.getRecurringEvents()
      expect(result.map(rEvent => ({ ...rEvent, id: undefined }))).toMatchObject([recurringEvent, recurringEvent2])
    });

    test('they should be classes', async () => {
      const result = await storageService.getRecurringEvents()
      expect(result[0]).toBeInstanceOf(RecurringEvent)
    });
  });

  describe('when getting events', () => {
    beforeEach(async () => {
      db.events.bulkAdd([event, event2, event3, event4])
      db.recurringEvents.bulkAdd([recurringEvent, recurringEvent2])
    })

    afterEach(async () => {
      await db.events.clear()
      await db.recurringEvents.clear()
    })

    it('should get them and generate recurring events', async () => {
      const result = await storageService.getEvents({ end: new Date("2020-02-02T00:00"), start: new Date("2020-01-01T00:00") })
      const expected: IEvent[] = [
        {
          ...event,
          id: undefined
        },
        {
          ...recurringEvent2.archetype,
          type: "generated",
          id: recurringEvent2.id,
          date: new Date("2020-01-01T00:00")
        },
        {
          ...event3,
          id: undefined
        },
        {
          ...recurringEvent.archetype,
          type: "generated",
          id: recurringEvent.id,
          date: new Date("2020-01-05T00:00")
        },
        {
          ...recurringEvent.archetype,
          type: "generated",
          id: recurringEvent.id,
          date: new Date("2020-01-12T00:00")
        },
        {
          ...recurringEvent.archetype,
          type: "generated",
          id: recurringEvent.id,
          date: new Date("2020-01-19T00:00")
        },
        {
          ...recurringEvent.archetype,
          type: "generated",
          id: recurringEvent.id,
          date: new Date("2020-01-26T00:00")
        },
        {
          ...event2,
          id: undefined
        },
        {
          ...recurringEvent2.archetype,
          type: "generated",
          id: recurringEvent2.id,
          date: new Date("2020-02-01T00:00")
        },
        {
          ...recurringEvent.archetype,
          type: "generated",
          id: recurringEvent.id,
          date: new Date("2020-02-02T00:00")
        }
      ]

      expect(result.map(event => ({ ...event, id: undefined }))).toMatchObject(expected)
    });
  });
});