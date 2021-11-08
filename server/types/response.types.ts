
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

export interface Post {
    tripcode?: string;
    posterName: string;
    dateTime: string;
    id: string;
    text: string;
    files: ChFile[];
}

export interface ChThread {
    id: string;
    board: Board;
    thumbNail: string;
    pinned: boolean;
    replies: number;
    images: number;
    title: string;
    expanded: boolean;
    posts: Post[];
}

export interface Page {
    board: Board;
    num: number;
    threads: ChThread[];
    totalpages: number;
}

export interface Catalog {
    board: Board;
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

