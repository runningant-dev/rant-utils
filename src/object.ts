import { isObject } from "./validate-convert";

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

export function copyTo(src: any, dest: any) {
    for(var m in src) {
        dest[m] = src[m];
    }
}

export function isEqualShallow(a: any, b: any) {
    var key;

    for(key in a) {
        if(a[key] !== b[key]) {
            return false;
        }
    }
    for(key in b) {
        if(a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

