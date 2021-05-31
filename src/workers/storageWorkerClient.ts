import * as Comlink from 'comlink'
import { Storage } from '../types';

const storageWorker = new Worker(new URL('./storageWorker', import.meta.url))

const storageWorkerClient: Storage.API = Comlink.wrap(storageWorker) as unknown as Storage.API

export default storageWorkerClient