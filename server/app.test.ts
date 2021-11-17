import { ANY_500_ERR, CORRECT_INDEX, CORRECT_PAGE, CORRECT_THREAD } from './constants/test/test-constants';
import * as Lain from './http/lain.calls';
import { ChThread, Index, Page } from './types/response.types';
import { server } from './app';
import request from 'supertest';

jest.mock('./http/lain.calls');
const getBoardsMock = Lain.getBoards as jest.MockedFunction<() => Promise<Index>>;
const getPageMock = Lain.getPage as jest.MockedFunction<() => Promise<Page>>;
const getThreadMock = Lain.getThread as jest.MockedFunction<() => Promise<ChThread>>;

beforeAll(() => {

    //Mocking the output of getBoards
    getBoardsMock.mockResolvedValueOnce(CORRECT_INDEX);
    getBoardsMock.mockRejectedValueOnce(ANY_500_ERR);
    // getPage
    getPageMock.mockResolvedValueOnce(CORRECT_PAGE);
    getPageMock.mockRejectedValueOnce(ANY_500_ERR);
    // getThread
    getThreadMock.mockResolvedValueOnce(CORRECT_THREAD);
    getThreadMock.mockRejectedValueOnce(ANY_500_ERR);

})

test('/api/lain/boards Happy path', () => {
    return request(server)
            .get('/api/lain/boards')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(CORRECT_INDEX);
            });
});

test('/api/lain/boards Fails with server error', () => {
    return request(server)
            .get('/api/lain/boards')
            .catch(err => {
                expect(err.statusCode).toBe(500);
                expect(err.body).toEqual(ANY_500_ERR);
            });
});

test('api/lain/:board/page/:pageNum Happy path', () => {
    return request(server)
            .get('/api/lain/progr/page/1')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(CORRECT_PAGE);
            });
});

test('api/lain/:board/page/:pageNum Fails with server error', () => {
    return request(server)
            .get('/api/lain/progr/page/1')
            .catch(err => {
                expect(err.statusCode).toBe(500);
                expect(err.body).toEqual(ANY_500_ERR);
            });
});

test('api/lain/:board/thread/:threadId Happy path', () => {
    return request(server)
            .get('/api/lain/progr/thread/1')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(CORRECT_THREAD);
            });
});

test('api/lain/:board/thread/:threadId Fails with server error', () => {
    return request(server)
            .get('/api/lain/progr/thread/1')
            .catch(err => {
                expect(err.statusCode).toBe(500);
                expect(err.body).toEqual(ANY_500_ERR);
            });
});