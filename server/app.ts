import express from 'express';
import * as Lain from './http/lain.calls';

const app = express();

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

export const server = app;