"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualShallow = exports.copyTo = exports.mergeObject = exports.withoutID = void 0;
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
