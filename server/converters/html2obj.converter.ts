import { Board, Break, Catalog, ChFile, ChThread, Fragment, Post } from "../types/response.types";
import { parse, HTMLElement, TextNode, Node } from "node-html-parser";

export function toBoards(html: string) : Board[] {
    let boards: Board[] | undefined = []

    boards = parse(html)
                .querySelectorAll('.sub')
                ?.map
                (
                    element => {
                        let boardType = element.getAttribute('data-description');
                        let boardSub: Board[] = element.childNodes ? element.childNodes
                        .filter(node => node.nodeType.valueOf() === 1)
                        .map(
                            node => {
                                let nStr = node.toString().split("\"");
                                return { id: nStr[1].split('/')[1], type: boardType, title: nStr[3]};
                            }
                        ) : [];
                        return boardSub;
                    }
                )
                .reduce((prev, cur) => prev.concat(cur), [])
                .filter(b => b.type ? (b.type !== 'Notices' && 
                                        b.type !== 'Services' && 
                                        b.type !== 'Elsewhere') : false);
    
    return boards ? boards : [];
}

export function toPage(board: string, pageNum: number, html: string) {

    let htEl = parse(html);
    let totalPages = htEl
                        .querySelector('.pages')
                        ?.getElementsByTagName('a')
                        .filter(el => /\/[0-9]+\.html/.test(getAttrNullSafe(el, 'href')))
                        .map(el => Number(getAttrNullSafe(el, 'href')
                                                    .split('/')
                                                    .slice(-1)[0]
                                                    .split('.')[0]))
                        .reduce((prev, cur) => prev <= cur ? cur : prev, -1);

    let threads = htEl
                    .querySelectorAll('.thread')
                    ?.map((el) => toThread(el, board, false));

    return { 
                board: board, 
                num: pageNum, 
                threads: threads ? threads : [], 
                totalPages: totalPages ? totalPages : -1,
            }
}

/**
 * Converts the HTML from the board catalog to a Catalog object
 * @param board the board from which you have pulled the catalog html
 * @param html the catalog html
 * @returns a Catalog full of threads
 */
export function toCatalog(board: string, html: string) : Catalog {
    let root = parse(html);

    return {
        board: board,
        threads: toCatalogThreads(root, board),
    }
}

export function fromStringToThread(html: string, board: string, expanded: boolean) : ChThread {
    return toThread(
                querySelectorNullSafe(parse(html), '.thread'),
                board,
                expanded
            );
}

export function toThread(root: HTMLElement, board: string, expanded: boolean): ChThread {
    return { 
            id: getThreadId(root), 
            board: board, 
            pinned: getPinned(root), 
            replies: getReplies(root),
            images: getImages(root),
            title: getThreadTitle(root),
            thumbNail: getThumbNail(root),
            expanded: expanded,
            posts: getPosts(root),
        };
}

function getThreadId(root: HTMLElement) : string {
    let id: string | undefined = root.getAttribute('id')?.split('_').slice(-1)[0];
    return id ? id : '';
}

function getPinned(root: HTMLElement) : boolean {
    return root.querySelector('.fa-thumb-tack') ? true : false;
}

function getReplies(root: HTMLElement) : number {
    let initArray : string[] | null | undefined = 
                root.querySelector('.omitted')
                    ?.innerHTML
                    .match(/[0-9]+ post/);
    let replies: number = 
        initArray ? 
            Number(initArray[0].split(' ')[0]) :
            -1;

    return replies;
}

function getImages(root: HTMLElement) : number {
    let initArray : string[] | null | undefined = 
                root.querySelector('.omitted')
                    ?.innerHTML
                    .match(/[0-9]+ image repl/);
    let images: number = 
        initArray ? 
            Number(initArray[0].split(' ')[0]) :
            -1;
    return images;
}

function getThreadTitle(root: HTMLElement) : string {
    let title: string | undefined | null = 
        root.querySelector('.op')
            ?.querySelector('.subject')
            ?.innerHTML;
    return title ? title : '';
}

function getThumbNail(root: HTMLElement) : string {
    //this is a stub
    let thumbnail: string | null | undefined = 
        root.querySelector('.files')
            ?.querySelector('.post-image')
            ?.getAttribute('src');
    return thumbnail ? thumbnail : '';
}

function getPosts(root: HTMLElement) : Post[] {
    //this is a stub
    let posts: Post[] | undefined = 
        root.querySelectorAll('.post')
            ?.map(el => toPost(el));
    return posts ? posts : [];
}

export function toPost(root: HTMLElement) : Post {
    return {
        tripcode: getTrip(root),
        posterName: getPosterName(root),
        dateTime: getPostDateTime(root),
        id: getPostId(root),
        text: getPostText(root),
        isOP: isOriginalPoster(root),
        files: isOriginalPoster(root) ? getFilesOP(root) : getFiles(root),
        repliesById: getPostReplies(root),
    };
}

function getTrip(root: HTMLElement) : string {
    // this is a stub
    return '';
}

function getPosterName(root: HTMLElement) : string {
    let name : string | null | undefined =
        root.querySelector('.intro')
            ?.querySelector('.name')
            ?.innerHTML;
    return name ? name : '';
}

function getPostDateTime(root: HTMLElement) : string {
    let dt : string | null | undefined = 
        root.querySelector('.intro')
            ?.getElementsByTagName('time')[0]
            .getAttribute('datetime');
    return dt ? dt : '';
}

function getPostId(root: HTMLElement) : string {
    let id: string | null | undefined = 
        root.getAttribute('id');
    return id ? id.split('_')[1] : '';
}

function getPostText(root: HTMLElement) : Fragment[] {
    let text: Fragment[] | null | undefined = 
        root.querySelector('.body')
            ?.childNodes
            .map(node => {
                return toFragment(node);
            });
    
    return text ? text : [];
}

function toFragment(node: Node) : Fragment {
    if(node instanceof TextNode) {
        return { pt: null, text: escapeHTML(node.textContent) }
    }
    else if(node instanceof HTMLElement) {
        switch(node.tagName) {
            case 'A':
                return { 
                         anc: null, 
                         href: getAttrNullSafe(node, 'href'), 
                         text: node.innerHTML
                        };
            case 'CODE':
                return { ilc: null, text: node.innerHTML };
            
            case 'PRE': 
                return { blc: null, text: node.innerHTML };

            case 'BR': 
                return { br: null };
            
            case 'SPAN':
                return getAttrNullSafe(node, 'class') === 'spoiler' ? 
                        { splr: null, text: node.innerHTML } :
                        { qt: null, text: node.innerHTML };

            case 'EM':
                return { itlc: null, text: node.innerHTML };

            case 'STRONG':
                return { bdfc: null, text: node.innerHTML }
            
            default: 
                return { br: null };
        }
    }
    else {
        return { br: null }
    }
}

function isOriginalPoster(root: HTMLElement) : boolean {
    return root.classList.contains('op');
}

function getFilesOP(root: HTMLElement) : ChFile[] {
    let files: ChFile[] | null | undefined = 
        root.parentNode
            ?.querySelector('.files')
            ?.querySelectorAll('.file')
            ?.map(file => toFile(file));

    return files ? files : [];
}

function getFiles(root: HTMLElement) : ChFile[] {
    let files: ChFile[] | null | undefined = 
        root.querySelector('.files')
            ?.querySelectorAll('.file')
            ?.map(file => toFile(file));

    return files ? files : [];
}

export function toFile(root: HTMLElement) : ChFile {
    return {
        url: getFileUrl(root),
        name: getFileName(root),
        thumbnail: getFileThumbnail(root),
    }
}

function getFileUrl(root: HTMLElement) : string {
    let url: string | null | undefined = 
        root.querySelector('.fileinfo')
            ?.getElementsByTagName('a')[0]
            ?.getAttribute('href');

    return url ? url : '';
}

function getFileName(root: HTMLElement) : string {
    let name: string | null | undefined = 
        root.querySelector('.postfilename')
            ?.innerHTML;

    return name ? name : '';
}

function getFileThumbnail(root: HTMLElement) : string {
    let thumb: string | null | undefined = 
        root.querySelector('.post-image')
            ?.getAttribute('src');

    return thumb ? thumb : '';
}

function getPostReplies(root: HTMLElement) : string[] {
    
    let replies: string[] | null | undefined = 
        getThreadRootFromPost(root)
            .querySelectorAll('.post')
            .filter(el => { 
                return Number(getPostId(el)) > 
                        Number(getPostId(root));
            })
            .map(el => querySelectorNullSafe(el, '.body')
                            .getElementsByTagName('a')
                            .map(a => {
                                //console.log('a');
                                return getAttrNullSafe(a, 'href');
                            })
                            .filter(href => href.includes(`.html#${Number(getPostId(root))}`))
                            .map(href => getPostId(el)))
            .reduce((prev, cur) => prev.concat(cur), []);
    return replies ? replies : [];
}



function querySelectorNullSafe(el: HTMLElement, selector: string): HTMLElement {
    let selected = el.querySelector(selector);
    return selected ? selected : new HTMLElement('blank', {}, '', null);
}

function getAttrNullSafe(el: HTMLElement, attrName: string) : string {
    let attr: string | undefined = el.getAttribute(attrName);
    return (typeof attr === 'undefined' || attr === null) ? '' : attr;
}

export function escapeHTML(str: string) : string {
    return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
}

function getThreadRootFromPost(post: HTMLElement) : HTMLElement {
    if(getAttrNullSafe(post, 'class') === 'post reply'){
        return post.parentNode.parentNode;
    }
    else if(getAttrNullSafe(post, 'class') === 'post op') {
        return post.parentNode;
    }
    return new HTMLElement('', {}, '', null);
}

/**
 * Converts the catalog HTML into a list of ChThreads
 * @param root the HTML root of the board catalog
 * @param board the board you selected
 */
function toCatalogThreads(root: HTMLElement, board: string) : ChThread[] {
    let threads: ChThread[] = []

    threads = root.querySelectorAll('.thread')
                .map(thread => toCatalogThread(thread, board))

    return threads;
}

/**
 * Converts an HTML object of class "thread" into a ChThread.
 * @param root the HTML element in question
 * @param board the board you selected
 * @returns a ChThread representing the catlog thread
 */
function toCatalogThread(root: HTMLElement, board: string) : ChThread {
    let id: string | undefined = root.parentNode.getAttribute('data-id');
    let pinned: boolean = root.parentNode.getAttribute('data-sticky') === 'true';
    let title: string | undefined = root.querySelector('img')?.getAttribute('data-subject');
    let imagesAndReplies: number[] | undefined = getCatalogImagesAndReplies(root);
    let thumbnail: string | undefined = root.getElementsByTagName('img')[0]?.getAttribute('src');
    let post: Post = getCatalogPost(root);

    return {
        id: id ? id : '',
        board: board,
        pinned: pinned,
        replies: imagesAndReplies[0],
        images: imagesAndReplies[1],
        title: title ? title : '',
        expanded: false,
        posts: [post],
        thumbNail: thumbnail ? thumbnail : '',
    }
}

/**
 * Gets the number of images and replies from a catalog thread
 * @param root the root HTML element
 * @returns a two-element array consisting of the number of replies at index 0
 * and the number of images at index 1
 */
function getCatalogImagesAndReplies(root: HTMLElement) : number[] {
    let imagesAndReplies: number[] | undefined = 
        root.querySelector('.replies')
            ?.getElementsByTagName('strong')[0]
            ?.innerHTML
            .split(' ')
            .map(el => Number(el))
            .filter(el => !isNaN(el))

        return (imagesAndReplies && imagesAndReplies.length == 2) ? imagesAndReplies : [0, 0];
}

/**
 * Gets all the post data from a catalog thread and converts it into an object
 * @param root the root HTML element
 * @returns a Post object 
 */
function getCatalogPost(root: HTMLElement) : Post {
    let text: Fragment[] | undefined = 
        root.querySelector('.replies')
            ?.childNodes.slice(2)
            .map(toFragment);
    let id: string | undefined = root.parentNode.getAttribute('data-id');
    let fileUrl: string | undefined = root.getElementsByTagName('a')[0]?.getAttribute('href');
    let thumbnail: string | undefined = root.getElementsByTagName('img')[0]?.getAttribute('src');

    return {
        posterName: '',
        dateTime: '',
        id: id ? id : '',
        repliesById: [],
        files: [{
            url: fileUrl ? fileUrl : '',
            thumbnail: thumbnail ? thumbnail : '',
            name: ''
        }],
        text: text ? text : [],
        isOP: true,
    }
}