import {
    NodeBackgroundTaskManager,
    NodeHttpRequestSender,
    NodeLogDataFormatter
} from '../components'
import {
    container,
    HttpServiceName,
    initContainer,
    InMemoryKVStore,
    LoggingServiceName,
    PersistenceServiceName,
    ThreadsServiceName,
} from 'beemo-lib'

let containerInitialized = false

export function initNodeContainer() {

    if (containerInitialized) {
        return false
    }

    initContainer()

    // Http

    container.set(HttpServiceName.HttpClient, () => new NodeHttpRequestSender())

    // Logging

    container.set(LoggingServiceName.LogDataFormatter, () => new NodeLogDataFormatter())

    // Persistence

    container.set(PersistenceServiceName.KVStore, () => new InMemoryKVStore())

    // Threads

    container.set(ThreadsServiceName.BackgroundTaskManager, () => new NodeBackgroundTaskManager())

}