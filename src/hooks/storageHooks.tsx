import { useDependecies } from "./useDependencies";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Storage } from '../types'

function useEventsQuery(opts: Storage.Options) {
  const { storageService } = useDependecies()
  return useQuery('events', () => storageService.getEvents(opts))
}

function useHistoricalEventsMutation(opts: Storage.Options) {
  const { storageService } = useDependecies()
  const queryClient = useQueryClient()
  const putMutation = useMutation(storageService.putHistoricalEvents, { onSettled: () => queryClient.invalidateQueries("events") })
  const deleteMutation = useMutation(storageService.deleteHistoricalEvents, { onSettled: () => queryClient.invalidateQueries("events") })

  return {
    putMutation,
    deleteMutation
  }
}

function useRecurringEventsMutation(opts: Storage.Options) {
  const { storageService } = useDependecies()
  const queryClient = useQueryClient()
  const putMutation = useMutation(storageService.putRecurringEvents, { onSettled: () => queryClient.invalidateQueries("events") })
  const deleteMutation = useMutation(storageService.deleteRecurringEvents, { onSettled: () => queryClient.invalidateQueries("events") })

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