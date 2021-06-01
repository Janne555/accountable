import { useDependecies } from "./useDependencies";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { IEvent, IRecurringEvent } from '../types'
import { RulesLogic } from "json-logic-js";

function useEventsQuery(start?: Date, end?: Date, rulesLogic?: RulesLogic) {
  const { storageService } = useDependecies()
  return useQuery(['events', start, end, rulesLogic], () => storageService.getEvents({ start, end, rulesLogic }), {})
}

function useHistoricalEventsMutation() {
  const { storageService } = useDependecies()
  const queryClient = useQueryClient()
  const putMutation = useMutation((events: IEvent[]) => storageService.putHistoricalEvents(events), { onSettled: () => queryClient.invalidateQueries("events") })
  const deleteMutation = useMutation((ids: number[]) => storageService.deleteHistoricalEvents(ids), { onSettled: () => queryClient.invalidateQueries("events") })

  return {
    putMutation,
    deleteMutation
  }
}

function useRecurringEventsMutation() {
  const { storageService } = useDependecies()
  const queryClient = useQueryClient()
  const putMutation = useMutation((rEvents: IRecurringEvent[]) => storageService.putRecurringEvents(rEvents), { onSettled: () => queryClient.invalidateQueries("events") })
  const deleteMutation = useMutation((ids: number[]) => storageService.deleteRecurringEvents(ids), { onSettled: () => queryClient.invalidateQueries("events") })

  return {
    putMutation,
    deleteMutation
  }
}

export {
  useEventsQuery,
  useHistoricalEventsMutation,
  useRecurringEventsMutation
}