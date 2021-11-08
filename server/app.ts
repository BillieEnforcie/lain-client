import express from 'express';
import https, { RequestOptions } from 'https';
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

export const server = app;