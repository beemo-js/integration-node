"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beemo_lib_1 = require("beemo-lib");
var http = require("http");
var https = require("https");
var NodeHttpRequestSender = /** @class */ (function () {
    function NodeHttpRequestSender(baseRequest) {
        if (baseRequest === void 0) { baseRequest = new beemo_lib_1.Request(); }
        this.baseRequest = baseRequest;
    }
    NodeHttpRequestSender.prototype.sendRequest = function (request) {
        var _this = this;
        var finalRequest = beemo_lib_1.Request.merge(this.baseRequest, request);
        return new Promise(function (resolve, reject) {
            var finalUrl = finalRequest.getFinalUrl();
            var splitUrl = finalUrl.split('/');
            var shifted = splitUrl[0].includes('.');
            var scheme = shifted ? 'https' : splitUrl[0].slice(0, -1);
            var host = splitUrl[shifted ? 0 : 1];
            var url = splitUrl.slice(shifted ? 1 : 2).join('/');
            var reqOptions = {
                url: url,
                method: finalRequest.method,
                host: scheme + "://" + host,
                headers: finalRequest.headers
            };
            // What to do with the response
            var reqCallback = function (res) {
                var body = [];
                res.on('data', function (chunk) { return body.push(chunk); });
                res.on('end', function () { return resolve(_this.mapResponse(res, body)); });
            };
            // Create request
            var secure = scheme === 'https';
            var req = secure ? https.request(reqOptions, reqCallback) : http.request(reqOptions, reqCallback);
            // Handle errors
            req.on('error', function (err) { return reject(err); });
            // Add body
            req.write(finalRequest.body.build());
            // Send the request
            req.end();
        });
    };
    NodeHttpRequestSender.prototype.mapResponse = function (res, body) {
        return new beemo_lib_1.Response(res.statusCode, new beemo_lib_1.ResponseBody(body.join('')), res.statusMessage, res.headers);
    };
    return NodeHttpRequestSender;
}());
exports.NodeHttpRequestSender = NodeHttpRequestSender;
