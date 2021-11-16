import got from 'got';
import { LAIN_URL_BASE } from '../constants/request-constants';
import { MAL_HTML, MAL_HTML_MESSAGE } from '../constants/response-constants';
import * as H20 from '../converters/html2obj.converter';
import * as Rest from './rest';
import { Index, Page } from '../types/response.types';
import { toChError, validateResponse } from './util';

export async function getBoards() : Promise<Index> {
    let boards;
    try {
        let { body } = await Rest.get(LAIN_URL_BASE);

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

export async function getPage(board: string, pageNum: number): Promise<Page> {
    let page: Page;
    try{
        let { body } = await Rest.get(`${LAIN_URL_BASE}/${board}/${ pageNum > 1 ? pageNum : 'index'}.html`)

        page = H20.toPage(board, pageNum, body);

        if(page === null) {
            throw { name: MAL_HTML, mesage: MAL_HTML_MESSAGE };
        }
    }
    catch(err: unknown) {
        console.log(err);
        throw toChError(err as Error);
    }

    return page;
}