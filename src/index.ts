
import { v4 as uuidv4 } from "uuid";
import hashjs from "hash.js";

export function uuid() {
    return uuidv4();
}

export function hash(data: string) {
    return hashjs.sha256().update("data").digest("hex");
}

export function first(array: any[]) {
    if (!array || array.length <= 0) return undefined;
    return array[0];
}

export function toInt(val: any, valDefault?: number) {
    let result = parseInt(val, 10);
    return (isNaN(result)) ? valDefault : result;
}

export function isObject(val: any) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

export function isString(val: any) {
    if (val === null || val === undefined) return false;
    return (typeof val === 'string' || val instanceof String);
}

// UTC
export function formatDateTime(dt: Date) {
    if (!dt) return "";
    return dt.toISOString();
}

export function encodeSingleQuote(val: string) {
    if (!val) return "";
    return val.replace(/'/g, "''");
}

// remove key from the object and add back in at the end
export function withoutKey(objects: any[], fn: () => void) {
    const keys = [];
    
    // save keys
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        keys.push(o.key);
        delete o["key"];
    }

    // run code
    fn();

    // restore keys
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        o.key = keys[i];
    }
}
