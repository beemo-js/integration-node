import { HttpRequestSender, Request as AbstractRequest, Response as AbstractResponse } from 'beemo-lib';
export declare class NodeHttpRequestSender implements HttpRequestSender {
    private baseRequest;
    constructor(baseRequest?: AbstractRequest);
    sendRequest(request: AbstractRequest): Promise<AbstractResponse>;
    private mapResponse(res, body);
}
