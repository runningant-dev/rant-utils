import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export function hash(salt: string, value: string) {
    return crypto.createHmac("sha256", salt).update(value).digest("hex");
}

export function uuid() {
    return uuidv4();
}

// if there is an array provided and it has at least 1 element the first is returned
// otherwise if its not an array but is an object then its returned as-is
// otherwised undefined
export function first(array: any) {
    if (!array) return undefined;

	if (Array.isArray(array)) {
		if (array.length > 0) return array[0];
		return undefined;
	} else if (isObject(array)) {
		return array;
	}

    return undefined;
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
export function now() {
    return formatDateTime(new Date());
}

export function encodeSingleQuote(val: string) {
    if (!val) return "";
    return val.replace(/'/g, "''");
}

// remove id from the object and add back in at the end
export function withoutID(objects: any[], fn: () => void) {
    const ids = [];
    
    // save ids
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        ids.push(o.id);
        delete o["id"];
    }

    // run code
    fn();

    // restore ids
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        o.id = ids[i];
    }
}

export function mergeObject(obj: any, into: any) {
    if (!into) into = {};
    if (!obj) return into;

    let src = obj;
    let dest = into;

    for(var m in src) {
        const vSrc = src[m];
        let vDest = dest[m];

		if (Array.isArray(vSrc)) {
			dest[m] = vSrc;
			continue;
		}

        if (isObject(vSrc)) {
            if (!isObject(vDest)) {
                vDest = {};
                dest[m] = vDest;
            }
            mergeObject(vSrc, vDest);
            continue;
        } 

        dest[m] = vSrc;
    }

    return into;
}