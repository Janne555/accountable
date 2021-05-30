import { Schedule } from '../models'
import { ISchedule, ScheduleType } from '../types'

function makeSchedule(dayOf: number, type: ScheduleType): ISchedule {
  return new Schedule(dayOf, type)
}

export {
  makeSchedule
}