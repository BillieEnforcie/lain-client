import express from 'express';
import https, { RequestOptions } from 'https';
import { BOARDS_CORRECT_HTML } from './constants/test/test-constants';
import * as Lain from './http/lain.calls';

const app = express();

// app.use((req, res, next) => {
//     req.path = decodeURIComponent(req.path);
//     console.log(req.path)
//     next();
// });

// app.get('*', (req, res, next) => {
//     console.log(req.path);
//     console.log(req.url);
// 
//     res.send('SDLKFJSLKDF');
//     next();
// });

app.get('/ass', (req, res) => {
    console.log('AYYYYYYY')
    res.send('FUCK ME')
});


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

export const server = app;