import {LogDataFormatter} from 'beemo-lib'

export class NodeLogDataFormatter implements LogDataFormatter {
    format(log: Object): Object {
        return {
            date: new Date(),
            data: log
        }
    }
}