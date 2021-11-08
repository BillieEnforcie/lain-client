import got, { GotRequestFunction } from 'got';
import { BAD_HTML, BOARDS_CORRECT_HTML } from '../constants/test/test-constants';
import { ChError } from '../types/response.types';
import { toChError } from './util';
import * as Lain from './lain.calls';
import { MAL_HTML, MAL_HTML_MESSAGE } from '../constants/response-constants';

jest.mock('got');
const getMock = got.get as jest.MockedFunction<GotRequestFunction>;

beforeAll(() => {
    // Mock return values for tests in sequential order
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: BOARDS_CORRECT_HTML });
    getMock.mockResolvedValueOnce({ statusCode: 200, statusMessage: 'OK', body: BAD_HTML });
    getMock.mockResolvedValueOnce({ statusCode: 403, statusMessage: 'Forbidden', body: '' });
})

test('GET_BOARDS happy path', () => {
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

test('GET_BOARDS fails upon malformed html', () => {
    let err: ChError = toChError({ name: MAL_HTML, message: MAL_HTML_MESSAGE } as Error);
    return Lain.getBoards().catch(error => expect(error).toEqual(err));
});

test('GET_BOARDS fails on status error', () => {
    let err: ChError = toChError({ name: '403', message: 'Forbidden'});
    return Lain.getBoards().catch(error => expect(error).toEqual(err));
});