"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.invertColor = exports.clean = exports.toBase26Digit = exports.positiveNumberToBase26 = exports.toBase26 = exports.toRomanNumeral = exports.toDate = exports.tomorrow = exports.toJSON = exports.isStr = exports.toStr = exports.toBool = exports.isArray = exports.clone = exports.isPromise = exports.flattenString = exports.encodeSingleQuote = exports.utcNow = exports.formatDatabaseDate = exports.formatDatabaseDateTime = exports.isValidDate = exports.isString = exports.isObject = exports.toNumber = exports.toFloat = exports.toInt = void 0;
const colorText_1 = require("./colorText");
const format_1 = require("./format");
function toInt(val, valDefault) {
    let result = parseInt(val, 10);
    return (isNaN(result)) ? valDefault : result;
}
exports.toInt = toInt;
function toFloat(val) {
    return parseFloat(val);
}
exports.toFloat = toFloat;
function toNumber(val, defaultVal) {
    if ((val === "") && (defaultVal === undefined))
        return NaN;
    const n = Number(val);
    if (isNaN(n) && defaultVal !== undefined) {
        return defaultVal;
    }
    return n;
}
exports.toNumber = toNumber;
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
function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}
exports.isValidDate = isValidDate;
// export function isValidDate(val: any) {
// 	if (!val) return false;
// 	return typeof val.getMonth === 'function';
// }
// UTC
function formatDatabaseDateTime(dt) {
    if (!dt)
        return "";
    return dt.toISOString();
}
exports.formatDatabaseDateTime = formatDatabaseDateTime;
function formatDatabaseDate(dt) {
    let result = formatDatabaseDateTime(dt);
    if (!result)
        return result;
    const parts = result.split("T");
    if (parts.length > 1) {
        return parts[0];
    }
    else {
        return "";
    }
}
exports.formatDatabaseDate = formatDatabaseDate;
function utcNow() {
    return formatDatabaseDateTime(new Date());
}
exports.utcNow = utcNow;
function encodeSingleQuote(val) {
    if (!val)
        return "";
    return val.replace(/'/g, "''");
}
exports.encodeSingleQuote = encodeSingleQuote;
function flattenString(s) {
    return s.replace(/\n/g, (0, colorText_1.colorText)("\\n", "FgGreen"));
}
exports.flattenString = flattenString;
// ---------------
function isPromise(p) {
    if (p !== null &&
        typeof p === 'object' &&
        typeof p.then === 'function' &&
        typeof p.catch === 'function') {
        return true;
    }
    return false;
}
exports.isPromise = isPromise;
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.clone = clone;
function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]";
}
exports.isArray = isArray;
function toBool(val) {
    if (val === undefined || val === null)
        return false;
    return (val && (val === true || val === "true" || val === "1" || val === "True" || val === "y" || val === "Y"));
}
exports.toBool = toBool;
function toStr(val, defaultValue) {
    if (isStr(val))
        return val;
    if (val !== null && val !== undefined) {
        return String(val);
    }
    else {
        return (defaultValue !== undefined) ? defaultValue : "";
    }
}
exports.toStr = toStr;
function isStr(val) {
    return (typeof val === 'string' || val instanceof String);
}
exports.isStr = isStr;
function toJSON(val) {
    if (isStr(val)) {
        try {
            return JSON.parse(val);
        }
        catch (e) {
        }
    }
    return null;
}
exports.toJSON = toJSON;
function tomorrow() {
    const dt = new Date();
    dt.setDate(dt.getDate() + 1);
    const result = toDate((0, format_1.formatDate)(dt));
    return result;
}
exports.tomorrow = tomorrow;
function toDate(val) {
    let dt = val;
    if (isString(val)) {
        const parts = val.split("-");
        const s = [];
        for (let p of parts) {
            if (p.length === 1)
                p = "0" + p;
            s.push(p);
        }
        dt = new Date(s.join("-"));
    }
    return dt;
}
exports.toDate = toDate;
function toRomanNumeral(num) {
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';
    const keys = Object.keys(roman);
    for (var i = 0; i < keys.length; i++) {
        const k = keys[i];
        var q = Math.floor(num / roman[k]);
        num -= q * roman[k];
        str += k.repeat(q);
    }
    return str;
}
exports.toRomanNumeral = toRomanNumeral;
function toBase26(value) {
    if (value < 0) {
        return "-" + positiveNumberToBase26(Math.abs(value));
    }
    else {
        return positiveNumberToBase26(value);
    }
}
exports.toBase26 = toBase26;
function positiveNumberToBase26(value) {
    if (value < 26) {
        return toBase26Digit(value);
    }
    else {
        return [
            positiveNumberToBase26(value / 26),
            toBase26Digit(value % 26)
        ].join();
    }
}
exports.positiveNumberToBase26 = positiveNumberToBase26;
function toBase26Digit(value) {
    if (value > 25)
        return "";
    return String.fromCharCode(value + 65);
}
exports.toBase26Digit = toBase26Digit;
function clean(value, keepChars) {
    var result = "";
    if (!value || value.length <= 0)
        return "";
    for (var i = 0; i < value.length; i++) {
        const c = value.charAt(i);
        if (keepChars.indexOf(c) >= 0) {
            result += c;
        }
    }
    return result;
}
exports.clean = clean;
function invertColor(hex) {
    if (hex === "#000" || hex === "#000000") {
        return "#ffffff";
    }
    else if (hex === "#fff" || hex === "#ffffff") {
        return "#000000";
    }
    const rgb = hexColor2rgb(hex);
    var yuv = rgb2yuv(rgb);
    var factor = 180;
    var threshold = 100;
    yuv.y = clamp(yuv.y + (yuv.y > threshold ? -factor : factor));
    const result = yuv2rgb(yuv);
    return rgb2hexColor(result);
}
exports.invertColor = invertColor;
function rgb2hexColor(rgb) {
    return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
}
function dec2hex(n) {
    var hex = n.toString(16);
    if (hex.length < 2) {
        return '0' + hex;
    }
    return hex;
}
function hexColor2rgb(color) {
    color = color.substring(1); // remove #
    return {
        r: parseInt(color.substring(0, 2), 16),
        g: parseInt(color.substring(2, 4), 16),
        b: parseInt(color.substring(4, 6), 16)
    };
}
function rgb2yuv(rgb) {
    var y = clamp(rgb.r * 0.29900 + rgb.g * 0.587 + rgb.b * 0.114);
    var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
    var v = clamp(rgb.r * 0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
    return { y: y, u: u, v: v };
}
function yuv2rgb(yuv) {
    var y = yuv.y;
    var u = yuv.u;
    var v = yuv.v;
    var r = clamp(y + (v - 128) * 1.40200);
    var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
    var b = clamp(y + (u - 128) * 1.77200);
    return { r: r, g: g, b: b };
}
function clamp(n) {
    if (n < 0) {
        return 0;
    }
    if (n > 255) {
        return 255;
    }
    return Math.floor(n);
}
// expect yyyy-m-d format
function parseDate(val) {
    if (!val)
        return undefined;
    const parts = val.split("-");
    if (parts.length !== 3)
        return undefined;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // js uses month index zero based
    const day = parseInt(parts[2], 10);
    const dt = new Date(year, month, day);
    return dt;
}
exports.parseDate = parseDate;
