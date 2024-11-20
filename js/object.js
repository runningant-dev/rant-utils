"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setObjectValue = exports.getFirstObjectValue = exports.getObjectValue = exports.getValueFrom = exports.isEqualShallow = exports.copyTo = exports.mergeObject = exports.withoutID = void 0;
const validate_convert_1 = require("./validate-convert");
// remove id from the object and add back in at the end
function withoutID(objects, fn) {
    const ids = [];
    // save ids
    for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        ids.push(o.id);
        delete o["id"];
    }
    // run code
    fn();
    // restore ids
    for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        o.id = ids[i];
    }
}
exports.withoutID = withoutID;
function mergeObject(obj, into) {
    if (!into)
        into = {};
    if (!obj)
        return into;
    let src = obj;
    let dest = into;
    for (var m in src) {
        const vSrc = src[m];
        let vDest = dest[m];
        if (Array.isArray(vSrc)) {
            dest[m] = vSrc;
            continue;
        }
        if ((0, validate_convert_1.isObject)(vSrc)) {
            if (!(0, validate_convert_1.isObject)(vDest)) {
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
exports.mergeObject = mergeObject;
function copyTo(src, dest) {
    for (var m in src) {
        dest[m] = src[m];
    }
}
exports.copyTo = copyTo;
function isEqualShallow(a, b) {
    var key;
    for (key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    for (key in b) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualShallow = isEqualShallow;
function getValueFrom(obj, prop) {
    // prop could be e.g. "name", or ref to array element "cols[0]"
    let arrIndex;
    if (prop.endsWith("]")) {
        const i = prop.lastIndexOf("[");
        arrIndex = prop.substring(i + 1, prop.length - 1);
        prop = prop.substring(0, i);
    }
    let result = obj[prop];
    if (arrIndex !== undefined) {
        result = result[arrIndex];
    }
    return result;
}
exports.getValueFrom = getValueFrom;
function getObjectValue(obj, prop) {
    if (prop.indexOf(".") > 0) {
        const parts = prop.split(".");
        let o = obj;
        for (let p of parts) {
            o = getValueFrom(o, p);
            if (o === undefined || o === null)
                return o;
        }
        return o;
    }
    else {
        return getValueFrom(obj, prop);
    }
}
exports.getObjectValue = getObjectValue;
// find first occurence
function getFirstObjectValue(obj, prop) {
    function find(within, prop) {
        const keys = Object.keys(within);
        // does the key exist within this object?
        if (keys.indexOf(prop.name) >= 0) {
            // check that its an array when it should be 
            const v = within[prop.name];
            if ((prop.arrayIndex !== undefined) && Array.isArray(v)) {
                return v[prop.arrayIndex];
            }
            else if (!prop.arrayIndex) {
                return v;
            }
        }
        // else keep looking through all props 
        for (let k of keys) {
            const v = within[k];
            if (Array.isArray(v)) {
                const a = v;
                for (let item of a) {
                    if ((0, validate_convert_1.isObject)(item)) {
                        const result = find(item, prop);
                        if (result !== undefined)
                            return result;
                    }
                }
            }
            else if ((0, validate_convert_1.isObject)(v)) {
                const result = find(v, prop);
                if (result !== undefined)
                    return result;
            }
        }
        return undefined;
    }
    function parseProp(prop) {
        let arrayIndex;
        let name = prop;
        if (name.endsWith("]")) {
            const i = name.lastIndexOf("[");
            arrayIndex = Number(name.substring(i + 1, prop.length - 1));
            name = name.substring(0, i);
        }
        return {
            name,
            arrayIndex,
        };
    }
    const parts = prop.split(".");
    if (parts.length === 1) {
        const propInfo = parseProp(parts[0]);
        return find(obj, propInfo);
    }
    else {
        // find the first part
        const propInfo = parseProp(parts[0]);
        const start = find(obj, propInfo);
        if (!start)
            return undefined;
        // now expect exact match from this point on
        parts.splice(0, 1);
        return getObjectValue(start, parts.join("."));
    }
}
exports.getFirstObjectValue = getFirstObjectValue;
function setObjectValue(obj, prop, value) {
    if (prop.indexOf(".") > 0) {
        const parts = prop.split(".");
        let o = obj ? obj : {};
        // NOTE: nav to 2nd last part (the parent)
        for (let i = 0; i < parts.length - 1; i++) {
            const p = parts[i];
            const tmp = getValueFrom(o, p);
            if (tmp === undefined || tmp === null) {
                const newObj = {};
                o[p] = newObj;
                o = newObj;
            }
            else {
                o = tmp;
            }
        }
        // now set value
        o[parts[parts.length - 1]] = value;
    }
    else {
        obj[prop] = value;
    }
}
exports.setObjectValue = setObjectValue;
