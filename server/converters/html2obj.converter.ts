import { Board } from "../types/response.types";
import { parse } from "node-html-parser";

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