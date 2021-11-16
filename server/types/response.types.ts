
export interface Board {
    type?: string;
    title: string;
    id: string;
}

export interface ChFile {
    url: string;
    name: string;
    thumbnail: string;
}

export interface Break {
    br: null;
}

export interface PlainText {
    pt: null;
    text: string;
}

export interface Anchor {
    anc: null;
    text: string;
    href: string;
}

export interface InlineCode {
    ilc: null;
    text: string;
}

export interface BlockCode {
    blc: null;
    text: string;
}

export interface Spoiler {
    splr: null;
    text: string;
}

export interface Quote {
    qt: null;
    text: string;
}

export interface Italics {
    itlc: null;
    text: string;
}

export interface BoldFace {
    bdfc: null;
    text: string;
}

export type Fragment = Break | PlainText | Anchor | InlineCode | BlockCode |
                       Spoiler | Quote | Italics| BoldFace;

export interface Post {
    tripcode?: string;
    posterName: string;
    dateTime: string;
    id: string;
    isOP: boolean;
    text: Fragment[];
    repliesById: string[];
    files: ChFile[];
}

export interface ChThread {
    id: string;
    board: string;
    thumbNail: string;
    pinned: boolean;
    replies: number;
    images: number;
    title: string;
    expanded: boolean;
    posts: Post[];
}

export interface Page {
    board: string;
    num: number;
    threads: ChThread[];
    totalPages: number;
}

export interface Catalog {
    board: string;
    threads: ChThread[];
}

export interface Index {
    boards: Board[];
}

export interface ChError extends Error {
   status: Status; 
}

export interface Status {
    name: string;
    code: number;
}

