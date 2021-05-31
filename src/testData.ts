import { makeRecurringEvent, makeSchedule } from "./factories"
import { IEvent, IRecurringEvent } from "./types"

const event: IEvent = { amount: 1, categories: [], date: new Date("2020-01-01T00:00"), type: "historical", description: "hello" }
const event2: IEvent = { amount: 2, categories: [], date: new Date("2020-02-01T00:00"), type: "historical", description: "there" }
const event3: IEvent = { amount: 30, categories: [], date: new Date("2020-01-03T00:00"), type: "historical", description: "hello" }
const event4: IEvent = { amount: 40, categories: [], date: new Date("2004-01-01T00:00"), type: "historical", description: "bar" }

const events = { event, event2, event3, event4 }

const recurringEvent: IRecurringEvent = makeRecurringEvent([makeSchedule(0, "weekly")], { amount: 5, categories: [], date: new Date("2020-01-01T00:00"), type: "archetype", description: "hello" })
const recurringEvent2: IRecurringEvent = makeRecurringEvent([makeSchedule(1, "monthly")], { amount: 50, categories: ["asd"], date: new Date("2021-01-01T00:00"), type: "archetype", description: "there" })

const recurringEvents = { recurringEvent, recurringEvent2 }

export {
  events,
  recurringEvents
}