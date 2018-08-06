"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initNodeContainer_1 = require("./initNodeContainer");
var beemo_lib_1 = require("beemo-lib");
function initBeemoForNode() {
    beemo_lib_1.initBeemoCore();
    initNodeContainer_1.initNodeContainer();
}
exports.initBeemoForNode = initBeemoForNode;
