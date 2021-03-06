import { makeEvent, makeRecurringEvent } from "../factories";
import Database from "../misc/database";
import { RecurringEvent } from "../models";
import * as TESTDATA from "../testData";
import { IEvent } from "../types";
import StorageWorkerAPI from "../workers/storageWorkerAPI";
import StorageService from "./storageService";

describe('storageWorker', () => {
  const db = new Database()
  const storageWorker = new StorageWorkerAPI(db)
  const storageService = new StorageService(storageWorker)

  const { event, event2, event3, event4 } = TESTDATA.events
  const { recurringEvent, recurringEvent2 } = TESTDATA.recurringEvents

  describe('historical events', () => {
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

    it('should add events', async () => {
      const newEvent = makeEvent(1, new Date(), [], "historical", "new event")
      await storageService.putHistoricalEvents([newEvent])
      const allEvents = (await db.events.toArray()).map(e => ({ ...e, id: undefined }))
      expect(allEvents).toContainEqual(newEvent)
    });

    it('should modify events', async () => {
      const oldEvent = await db.events.toCollection().first()

      const modifiedEvent = makeEvent(1, new Date(), [], "historical", "modified event", oldEvent?.id)
      await storageService.putHistoricalEvents([modifiedEvent])

      const allEvents = await db.events.toArray()
      expect(allEvents).toContainEqual(modifiedEvent)
      expect(allEvents).not.toContainEqual(oldEvent)
    });

    it('should delete events', async () => {
      const oldEvent = await db.events.toCollection().first()

      if (!oldEvent?.id) {
        throw Error("invalid test state")
      }

      await storageService.deleteHistoricalEvents([oldEvent.id])

      const allEvents = await db.events.toArray()
      expect(allEvents).not.toContainEqual(oldEvent)
    });

    it('should filter using json logic', async () => {
      const result = await storageService.getHistoricalEvents({ rulesLogic: { "==": [{ var: "amount" }, 1] } })
      expect(result.map(e => ({ ...e, id: undefined }))).toContainEqual(event)
    });

    it('should throw error for invalid json logic', async () => {
      await expect(storageService.getHistoricalEvents({ rulesLogic: { "foo": [{ var: "amount" }, 1] } as any })).rejects.toThrowError("Unrecognized operation foo")
    });
  });

  describe('recurring events', () => {
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

    it('should add events', async () => {
      const newEvent = makeRecurringEvent([], makeEvent(1, new Date(), [], "archetype", "Hello"))
      await storageService.putRecurringEvents([newEvent])
      const allEvents = (await db.recurringEvents.toArray()).map(e => ({ ...e, id: undefined }))
      expect(allEvents).toContainEqual(newEvent)
    });

    it('should modify events', async () => {
      const oldEvent = await db.recurringEvents.toCollection().first()

      const modifiedEvent = makeRecurringEvent([], makeEvent(1, new Date(), [], "archetype", "modified thing"), oldEvent?.id)
      await storageService.putRecurringEvents([modifiedEvent])

      const allEvents = await db.recurringEvents.toArray()
      expect(allEvents).toContainEqual(modifiedEvent)
      expect(allEvents).not.toContainEqual(oldEvent)
    });

    it('should delete events', async () => {
      const oldEvent = await db.recurringEvents.toCollection().first()

      if (!oldEvent?.id) {
        throw Error("invalid test state")
      }

      await storageService.deleteRecurringEvents([oldEvent.id])

      const allEvents = await db.recurringEvents.toArray()
      expect(allEvents).not.toContainEqual(oldEvent)
    });


    it('should ignore dates', async () => {
      const result = await storageService.getRecurringEvents({ start: new Date(), end: new Date() })
      expect(result).toHaveProperty('length', 2)
    });

    it('should ignore json logic', async () => {
      const result = await storageService.getRecurringEvents({ rulesLogic: { "==": [{ var: "amount" }, 1] } })
      expect(result).toHaveProperty('length', 2)
    });
  });

  describe('events', () => {
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

    it('should filter using json logic', async () => {
      const result = await storageService.getEvents({
        rulesLogic: { and: [{ ">=": [{ var: "amount" }, 4] }, { "==": [{ var: "description" }, "hello"] }] },
        end: new Date("2020-02-02T00:00"),
        start: new Date("2020-01-01T00:00")
      })

      const expected: IEvent[] = [
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