"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeLogDataFormatter = /** @class */ (function () {
    function NodeLogDataFormatter() {
    }
    NodeLogDataFormatter.prototype.format = function (log) {
        return {
            date: new Date(),
            data: log
        };
    };
    return NodeLogDataFormatter;
}());
exports.NodeLogDataFormatter = NodeLogDataFormatter;
