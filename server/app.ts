import express, { Request, Response } from 'express';
import * as Lain from './http/lain.calls';

const app = express();

// GET Board
app.get('/api/lain/boards', 
    (req, res) => {
        console.log('calling /api/lain/boards');
        Lain.getBoards().then(boards => {
            res.send(boards);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }
);

app.get('/api/lain/:board/page/:pageNum', 
    (req, res) => {
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
);

app.get('/api/lain/:board/thread/:threadId', 
    (req, res) => {
        let { board, threadId } = req.params;
        console.log(`calling /api/${board}/thread/${threadId}`);
        Lain.getThread(board, threadId)
            .then(thread => res.send(thread))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

    }
);

app.get('/api/lain/:board/catalog', getCatalog);

/**
 * GET Catalog, /api/lain/:board/catalog
 *  Takes "board", a string, as a path parameter.
 *  "Board" refers to the board from which 
 *  we're pulling the catalog.
 * @param req {Request}
 * @param res {Response}
 */
function getCatalog(req: Request, res: Response) : void {
    let { board } = req.params;
    console.log(`calling GET /api/lain/${board}/catalog`);
    Lain.getCatalog(board)
        .then(catalog => res.send(catalog))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

export const server = app;