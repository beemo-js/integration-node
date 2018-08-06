import { BackgroundTaskManager } from 'beemo-lib';
export declare class NodeBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void;
}
