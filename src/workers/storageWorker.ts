import Database from "../misc/database";
import StorageWorkerAPI from "./storageWorkerAPI";
import * as Comlink from 'comlink'

const database = new Database()
const storageWorkerAPI = new StorageWorkerAPI(database)

Comlink.expose(storageWorkerAPI)