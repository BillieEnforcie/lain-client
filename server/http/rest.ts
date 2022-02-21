import { createWriteStream, WriteStream } from "fs";
import got, { Response } from "got";
import { pipeline, Writable } from "stream";
import { promisify } from "util";
import { validateResponse } from "./util";

export async function get(url: string): Promise<Response<string>>{
    return validateResponse(await got.get(url));
}

export function getFile(url: string, outStream: Writable): Promise<void> {
    const pl = promisify(pipeline);
    return pl(got.stream(url), outStream);
}