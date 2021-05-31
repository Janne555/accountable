import { IEvent } from "../types"

type CB<T> = (error: null | Error, data?: T) => void
type Options = {
  start?: Date
  end?: Date
}

const storageWorker = {
  getEvents({ }: Options, cb: CB<IEvent[]>) {
    
  }
}

export default storageWorker