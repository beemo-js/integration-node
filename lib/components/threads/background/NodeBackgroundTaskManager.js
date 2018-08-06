"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var NodeBackgroundTaskManager = /** @class */ (function () {
    function NodeBackgroundTaskManager() {
    }
    NodeBackgroundTaskManager.prototype.executeInBackground = function (fn) {
        process.nextTick(fn);
    };
    return NodeBackgroundTaskManager;
}());
exports.NodeBackgroundTaskManager = NodeBackgroundTaskManager;
