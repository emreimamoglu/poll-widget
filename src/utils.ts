import { Params } from "./types";

export const isParamsValid = (params : Params) : boolean => {
    // TODO: Add validation details

    if(!params.id || typeof params.id !== "string") return false;
    if(!params.question || typeof params.question !== "string") return false;
    if(!params.options || !Array.isArray(params.options)) return false;
    if(!params.element || !(params.element instanceof HTMLElement)) return false;

    return true
};