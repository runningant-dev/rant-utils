"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutKey = exports.encodeSingleQuote = exports.formatDateTime = exports.isString = exports.isObject = exports.toInt = exports.first = exports.hash = exports.uuid = void 0;
const uuid_1 = require("uuid");
const hash_js_1 = __importDefault(require("hash.js"));
function uuid() {
    return (0, uuid_1.v4)();
    //return crypto.randomBytes(16).toString("hex");
}
exports.uuid = uuid;
function hash(data) {
    return hash_js_1.default.sha256().update("data").digest("hex");
    //return crypto.createHash("sha256").update(data, "binary").digest("base64");
}
exports.hash = hash;
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
function encodeSingleQuote(val) {
    if (!val)
        return "";
    return val.replace(/'/g, "''");
}
exports.encodeSingleQuote = encodeSingleQuote;
// remove key from the object and add back in at the end
function withoutKey(objects, fn) {
    const keys = [];
    // save keys
    for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        keys.push(o.key);
        delete o["key"];
    }
    // run code
    fn();
    // restore keys
    for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        o.key = keys[i];
    }
}
exports.withoutKey = withoutKey;
