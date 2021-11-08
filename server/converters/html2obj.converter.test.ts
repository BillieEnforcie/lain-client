import { BOARDS_CORRECT_HTML, BOARDS_NO_CHILDREN, EMPTY_HTML } from '../constants/test/test-constants';
import * as H20 from './html2obj.converter';

test('Happy Path', () => {
    expect(H20.toBoards(BOARDS_CORRECT_HTML))
        .toEqual([
            { id: 'progr', type: 'TECH STUFF', title: 'LIGMA'}
        ]);
});

test('Elements of class "sub" have no child nodes', () => {
    expect(H20.toBoards(BOARDS_NO_CHILDREN))
        .toEqual([]);
});

test('Html has no elements of class "sub"', () => {
    expect(H20.toBoards(EMPTY_HTML))
        .toEqual([]);
});