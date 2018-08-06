import {BackgroundTaskManager} from 'beemo-lib'
import * as process from 'process'

export class NodeBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void {
        process.nextTick(fn)
    }
}
