import got from 'got';
import { LAIN_URL_BASE } from '../constants/request-constants';
import { MAL_HTML, MAL_HTML_MESSAGE } from '../constants/response-constants';
import * as H20 from '../converters/html2obj.converter';
import { Index } from '../types/response.types';
import { toChError, validateResponse } from './util';

export async function getBoards() : Promise<Index> {
    let boards;
    try {
        let { body, statusCode, statusMessage } = await got.get(LAIN_URL_BASE);

        validateResponse(statusCode, statusMessage);

        boards = H20.toBoards(body);

        if(boards.length === 0) {
            throw { name: MAL_HTML, message: MAL_HTML_MESSAGE };
        }
    }
    catch (err: unknown) {
        console.log(err);
        throw toChError(err as Error);
    }
    return { boards: boards };
}