import { isDate } from "lodash"
import { IEvent } from "../types"

function isDay(dayOf: number): dayOf is Day {
  return dayOf >= 0 && dayOf < 7
}

function isEvent(obj: unknown): obj is IEvent {
  if (!obj) return false
  if (typeof obj !== "object") return false
  const asEvent = obj as IEvent
  if (asEvent.id != null && typeof asEvent.id !== "number") return false
  if (typeof asEvent.amount !== "number") return false
  if (!isDate(asEvent.date)) return false
  if (!["historical", "generated", "archetype"].includes(asEvent.type)) return false
  if (!Array.isArray(asEvent.categories)) return false
  if (asEvent.categories.some(category => typeof category !== "string")) return false
  if (typeof asEvent.description !== "string") return false
  return true
}

export {
  isDay,
  isEvent
}