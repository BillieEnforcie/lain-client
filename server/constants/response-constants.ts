import { Status } from "../types/response.types";

export const ERROR_STATUS: Map<number, Status> = new Map(
    [
        [400, { name: 'Bad Response', code: 400 }],
        [401, { name: 'Unauthorized', code: 401 }],
        [403, { name: 'Forbidden', code: 403 }],
        [404, { name: 'Not Found', code: 404 }],
        [500, { name: 'Internal Server Error', code: 500 }],
    ]
);

export const MAL_HTML = 'MALFORMED_HTML';
export const MAL_HTML_MESSAGE = 
    'The original website is either returning malformed HTML or has changed its document structure';

export const CALL_ERR = 'CALL_ERR';
export const CALL_ERR_MESSAGE = 'Unexpected error returned from HTTP Call';