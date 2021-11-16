import got, { GotRequestFunction } from 'got';
import { BAD_HTML, BOARDS_CORRECT_HTML, CORRECT_PAGE, PAGE_HTML } from '../constants/test/test-constants';
import { ChError } from '../types/response.types';
import { toChError } from './util';
import * as Lain from './lain.calls';
import { MAL_HTML, MAL_HTML_MESSAGE } from '../constants/response-constants';

jest.mock('got');
const getMock = got.get as jest.MockedFunction<GotRequestFunction>;

beforeAll(() => {
    // Mock return values for tests in sequential order
    // getBoards
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: BOARDS_CORRECT_HTML });
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: BAD_HTML });
    getMock.mockResolvedValueOnce({ statusCode: 403, statusMessage: 'Forbidden', body: '' });
    //getPage
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: PAGE_HTML});
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: BAD_HTML });
    getMock.mockResolvedValueOnce({ statusCode: 403, statusMessage: 'Forbidden', body: '' });
});

test('getBoards_happy path', () => {
    return Lain.getBoards().then(response => {
        expect(response).toEqual(
            {
                boards: 
                [
                    { id: 'progr', type: 'TECH STUFF', title: 'LIGMA'}
                ]
            }
        );
    });
});

test('getBoards_fails upon malformed html', () => {
    let err: ChError = toChError({ name: MAL_HTML, message: MAL_HTML_MESSAGE } as Error);
    return Lain.getBoards().catch(error => expect(error).toEqual(err));
});

test('getBoards_fails on status error', () => {
    let err: ChError = toChError({ name: '403', message: 'Forbidden'});
    return Lain.getBoards().catch(error => expect(error).toEqual(err));
});

test('getPage_happy path', () => {
    return Lain.getPage('progr', 1).then(response => {
        expect(response).toEqual(CORRECT_PAGE);
    });
});

test('getPage_fails upon malformed html', () => {
    let err: ChError = toChError({ name: MAL_HTML, message: MAL_HTML_MESSAGE } as Error);
    return Lain.getPage('progr', 1).catch(error => expect(error).toEqual(err));
});

test('getPage_fails on status error', () => {
    let err: ChError = toChError({ name: '403', message: 'Forbidden'});
    return Lain.getPage('progr', 1).catch(error => expect(error).toEqual(err));
});