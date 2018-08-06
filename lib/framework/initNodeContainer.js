"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = require("../components");
var beemo_lib_1 = require("beemo-lib");
var containerInitialized = false;
function initNodeContainer() {
    if (containerInitialized) {
        return false;
    }
    beemo_lib_1.initContainer();
    // Http
    beemo_lib_1.container.set(beemo_lib_1.HttpServiceName.HttpClient, function () { return new components_1.NodeHttpRequestSender(); });
    // Logging
    beemo_lib_1.container.set(beemo_lib_1.LoggingServiceName.LogDataFormatter, function () { return new components_1.NodeLogDataFormatter(); });
    // Persistence
    beemo_lib_1.container.set(beemo_lib_1.PersistenceServiceName.KVStore, function () { return new beemo_lib_1.InMemoryKVStore(); });
    // Threads
    beemo_lib_1.container.set(beemo_lib_1.ThreadsServiceName.BackgroundTaskManager, function () { return new components_1.NodeBackgroundTaskManager(); });
}
exports.initNodeContainer = initNodeContainer;
