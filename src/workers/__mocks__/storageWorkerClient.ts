import Database from "../../misc/database"
import StorageWorkerAPI from "../storageWorkerAPI"

const database = new Database()
const storageWorkerClient = new StorageWorkerAPI(database)

export default storageWorkerClient