import { parse, HTMLElement } from 'node-html-parser';
import { BOARDS_CORRECT_HTML, BOARDS_NO_CHILDREN, CORRECT_PAGE, CORRECT_THREAD, EMPTY_HTML, PAGE_HTML, THREAD_HTML } from '../constants/test/test-constants';
import * as H20 from './html2obj.converter';

test('toBoards_Happy Path', () => {
    expect(H20.toBoards(BOARDS_CORRECT_HTML))
        .toEqual([
            { id: 'progr', type: 'TECH STUFF', title: 'LIGMA'}
        ]);
});

test('toBoards_Elements of class "sub" have no child nodes', () => {
    expect(H20.toBoards(BOARDS_NO_CHILDREN))
        .toEqual([]);
});

test('toBoards_Html has no elements of class "sub"', () => {
    expect(H20.toBoards(EMPTY_HTML))
        .toEqual([]);
});

test('toThread_Happy Path', () => {
    let html = parse(THREAD_HTML).querySelector('.thread');
    expect(H20.toThread(html ? html : new HTMLElement('a', {}, '', null), 'progr', false))
        .toEqual(CORRECT_THREAD);
});

test('fromStringToThread_Happy Path', () => {
    expect(H20.fromStringToThread(THREAD_HTML, 'progr', false))
        .toEqual(CORRECT_THREAD);
});

test('toPage_Happy Path', () => {
    expect(H20.toPage('progr', 1, PAGE_HTML))
        .toEqual(CORRECT_PAGE);
});