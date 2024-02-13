"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObject = exports.withoutID = exports.encodeSingleQuote = exports.now = exports.formatDateTime = exports.isString = exports.isObject = exports.toInt = exports.first = exports.uuid = exports.hash = void 0;
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
function hash(salt, value) {
    return crypto_1.default.createHmac("sha256", salt).update(value).digest("hex");
}
exports.hash = hash;
function uuid() {
    return (0, uuid_1.v4)();
}
exports.uuid = uuid;
function first(array) {
    if (!array || array.length <= 0)
        return undefined;
    return array[0];
}
exports.first = first;
function toInt(val, valDefault) {
    let result = parseInt(val, 10);
    return (isNaN(result)) ? valDefault : result;
}
exports.toInt = toInt;
function isObject(val) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}
exports.isObject = isObject;
function isString(val) {
    if (val === null || val === undefined)
        return false;
    return (typeof val === 'string' || val instanceof String);
}
exports.isString = isString;
// UTC
function formatDateTime(dt) {
    if (!dt)
        return "";
    return dt.toISOString();
}
exports.formatDateTime = formatDateTime;
function now() {
    return formatDateTime(new Date());
}
exports.now = now;
function encodeSingleQuote(val) {
    if (!val)
        return "";
    return val.replace(/'/g, "''");
}
exports.encodeSingleQuote = encodeSingleQuote;
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
exports.mergeObject = mergeObject;
