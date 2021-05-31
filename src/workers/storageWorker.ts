import { IEvent, Callback, Storage } from "../types"

const storageWorker = {
  getEvents({ }: Storage.Options, cb: Callback<IEvent[]>) {

  }
}

export default storageWorker