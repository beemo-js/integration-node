import {
    HttpRequestSender,
    Request as AbstractRequest,
    Response as AbstractResponse,
    ResponseBody
} from 'beemo-lib'
import * as http from 'http'
import * as https from 'https'

export class NodeHttpRequestSender implements HttpRequestSender {

    constructor(
        private baseRequest: AbstractRequest = new AbstractRequest(),
    ) {}

    sendRequest(request: AbstractRequest): Promise<AbstractResponse> {
        const finalRequest = AbstractRequest.merge(this.baseRequest, request)

        return new Promise<AbstractResponse>((resolve, reject) => {

            const finalUrl = finalRequest.getFinalUrl()
            const splitUrl = finalUrl.split('/')
            const shifted = splitUrl[0].includes('.')
            const scheme = shifted ? 'https': splitUrl[0].slice(0, -1)
            const host = splitUrl[shifted ? 0: 1]
            const url = splitUrl.slice(shifted ? 1: 2).join('/')

            const reqOptions = {
                url: url,
                method: finalRequest.method,
                host: `${scheme}://${host}`,
                headers: finalRequest.headers
            }

            // What to do with the response
            const reqCallback = (res) => {
                const body = []
                res.on('data', chunk => body.push(chunk))
                res.on('end', () => resolve(this.mapResponse(res, body)))
            }

            // Create request
            const secure = scheme === 'https'
            const req = secure ? https.request(reqOptions, reqCallback): http.request(reqOptions, reqCallback)

            // Handle errors
            req.on('error', err => reject(err))

            // Add body
            req.write(finalRequest.body.build())

            // Send the request
            req.end()
        })
    }

    private mapResponse(res: http.IncomingMessage, body: any[]): AbstractResponse {
        return new AbstractResponse(
            res.statusCode,
            new ResponseBody(body.join('')),
            res.statusMessage,
            res.headers as { [key: string]: string }
        )
    }
}
