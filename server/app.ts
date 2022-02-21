import express, { application, Request, Response } from 'express';
import { ERROR_STATUS } from './constants/response-constants';
import * as Lain from './http/lain.calls';
import { FileType } from './types/generic.types';

const app = express();

app.get('/api/lain/boards', getBoardsLain);

app.get('/api/lain/:board/page/:pageNum', getPageLain);

app.get('/api/lain/:board/thread/:threadId', getThreadLain);

app.get('/api/lain/:board/catalog', getCatalogLain);

app.get('/api/lain/:board/file/:fileType/:fileId', getFileLain);

/**
 * GET Lain Board, /api/lain/boards
 * Gets the list of boards offered by LainChan
 * @param req {Request}
 * @param res {Response}
 */
function getBoardsLain(req: Request, res: Response) {
    console.log('calling /api/lain/boards');
    Lain.getBoards().then(boards => {
        res.send(boards);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

/**
 * GET Lain Page, /api/lain/:board/page/:pageNum
 * Takes "board" and "pageNum" as string parameters.
 * "Board" refers to the board and "pageNum" refers to 
 * the desired page number
 * @param req {Request}
 * @param res {Response}
 */
function getPageLain(req: Request, res: Response) : void {
    let { board, pageNum } = req.params;
    console.log(`calling /api/lain/${board}/page/${pageNum}`);
    Lain.getPage(board, Number(pageNum)).then(page => {
        res.send(page);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
}

/**
 * GET Lain Thread, /api/lain/:board/thread/:threadId
 * Takes "board" and "threadId" as string parameters.
 * "Board" refers to the board and "threadId" refers to 
 * the unique ID of the thread
 * @param req {Request}
 * @param res {Response}
 */
function getThreadLain(req: Request, res: Response) : void {
    let { board, threadId } = req.params;
    console.log(`calling /api/${board}/thread/${threadId}`);
    Lain.getThread(board, threadId)
        .then(thread => res.send(thread))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

/**
 * GET Lain Catalog, /api/lain/:board/catalog
 *  Takes "board", a string, as a path parameter.
 *  "Board" refers to the board from which 
 *  we're pulling the catalog.
 * @param req {Request}
 * @param res {Response}
 */
function getCatalogLain(req: Request, res: Response) : void {
    let { board } = req.params;
    console.log(`calling GET /api/lain/${board}/catalog`);
    Lain.getCatalog(board)
        .then(catalog => res.send(catalog))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

/**
 * GET Lain File
 * Gets the requested file from "board" by "fileType" and "fileId".
 * Parameter "fileType" can be either "thumbNail" or "fullSize" where 
 * "thumbNail" is a thumbnail image (obviously) and "fullSize" is the 
 * full size file of whatever type denoted by the file extension.
 * @param req {Request}
 * @param res {Response}
 */
function getFileLain(req: Request, res: Response) : void {
    let { board, fileId, fileType } = req.params;
    console.log(`calling GET /api/lain/${board}/file/${fileType}/${fileId}`);
    if(fileType !== 'thumbNail' && fileType !== 'fullSize') {
        console.log('wrong file type: ' + fileType);
        res.status(400).send({ status: ERROR_STATUS.get(400)});
    }
    Lain.getFile(board, fileType as FileType, fileId, res)
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

export const server = app;