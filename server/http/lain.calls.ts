import { LAIN_URL_BASE } from '../constants/request-constants';
import { MAL_HTML, MAL_HTML_MESSAGE } from '../constants/response-constants';
import * as H20 from '../converters/html2obj.converter';
import * as Rest from './rest';
import { Catalog, ChThread, Index, Page } from '../types/response.types';
import { toChError, validateResponse } from './util';
import { FileType } from '../types/generic.types';
import { Writable } from 'stream';

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

export async function getThread(board: string, threadId: string) : Promise<ChThread> {
    let thread;
    try {
        let { body } = await Rest.get(`${LAIN_URL_BASE}/${board}/res/${threadId}.html`);
        thread = H20.fromStringToThread(body , board, true);
    }
    catch(err: unknown) {
        console.log(err);
        throw toChError(err as Error);
    }

    return thread;
}

/**
 * Grabs the catalog for the given board.
 * Said catalog contains thread stubs for every thread 
 * active on the board in question.
 * @param board 
 * @returns a Catalog full of threads 
 */
export async function getCatalog(board: string) : Promise<Catalog> {
    let catalog: Catalog;

    try {
        let { body } = await Rest.get(`${LAIN_URL_BASE}/${board}/catalog.html`);
        catalog = H20.toCatalog(board, body);
    }
    catch(err: unknown) {
        console.log(err);
        throw toChError(err as Error);
    }

    return catalog;
}

export function getFile(board: string, filetype: FileType, fileId: string, outStream: Writable) : Promise<void> {
    let url = `${LAIN_URL_BASE}/${board}/${convertLainFileType(filetype)}/${fileId}`;
    return Rest.getFile(url, outStream)
}

function convertLainFileType(ft: FileType): string {
    return ft === 'fullSize' ? 'src' : 'thumb';
}