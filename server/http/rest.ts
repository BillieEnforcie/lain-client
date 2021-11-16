import got, { Response } from "got";
import { validateResponse } from "./util";

export async function get(url: string): Promise<Response<string>>{
    return validateResponse(await got.get(url));
}