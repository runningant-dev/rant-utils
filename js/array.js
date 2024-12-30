"use strict";
// if there is an array provided and it has at least 1 element the first is returned
// otherwise if its not an array but is an object then its returned as-is
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectArray = exports.last = exports.first = void 0;
const validate_convert_1 = require("./validate-convert");
// otherwised undefined
function first(array) {
    if (!array)
        return undefined;
    if (Array.isArray(array)) {
        if (array.length > 0)
            return array[0];
        return undefined;
    }
    else if ((0, validate_convert_1.isObject)(array)) {
        return array;
    }
    return undefined;
}
exports.first = first;
function last(array) {
    if (!array)
        return undefined;
    if (Array.isArray(array)) {
        if (array.length > 0)
            return array[array.length - 1];
        return undefined;
    }
    else if ((0, validate_convert_1.isObject)(array)) {
        return array;
    }
    return undefined;
}
exports.last = last;
function expectArray(a) {
    if (!a)
        return a;
    if (Array.isArray(a))
        return a;
    return [a];
}
exports.expectArray = expectArray;
