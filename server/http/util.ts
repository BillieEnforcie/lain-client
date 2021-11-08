import { CALL_ERR, CALL_ERR_MESSAGE, ERROR_STATUS } from "../constants/response-constants";
import { ChError, Status } from "../types/response.types";

export function toChError(error: Error): ChError {
    if(!isNaN(Number(error.name))) {
        return { 
            name: CALL_ERR, 
            message: CALL_ERR_MESSAGE, 
            status: {name: error.message, code: Number(error.name)}
        };
    }
    return { ...error, status: getStatus(error)};
}

function getStatus(error: Error): Status {
    //console.log("AYY VINNY GET THE STATUS ALREADY")
    switch(error.name) {
        default:
            let status = ERROR_STATUS.get(500);
            return status ? status : { name: '', code: 0 };
    }
}

export function validateResponse(statusCode: number, statusMessage?: string) {
    if(statusCode > 299 || statusCode < 200) {
        throw { name: statusCode.toString(), message: statusMessage };
    }
}