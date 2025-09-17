import { colorText } from "./colorText";
import { formatDate } from "./format";

export function toInt(val: any, valDefault?: number) {
    let result = parseInt(val, 10);
    return (isNaN(result)) ? valDefault : result;
}
export function toFloat(val: any): number {
    return parseFloat(val);
}
export function toNumber(val: any, defaultVal?: number): number {
    if ((val === "") && (defaultVal === undefined)) return NaN;

    const n = Number(val);
    if (isNaN(n) && defaultVal !== undefined) {
        return defaultVal;
    }

    return n;
}

export function isObject(val: any) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

export function isString(val: any) {
    if (val === null || val === undefined) return false;
    return (typeof val === 'string' || val instanceof String);
}

export function isValidDate(date: any) {
	const test = date instanceof Date ? date : new Date(date);
	return !isNaN(test.getTime());
}
// export function isValidDate(val: any) {
// 	if (!val) return false;
// 	return typeof val.getMonth === 'function';
// }


// UTC
export function formatDatabaseDateTime(dt: Date) {
    if (!dt) return "";
    return dt.toISOString();
}
export function formatDatabaseDate(dt: Date) {
	let result = formatDatabaseDateTime(dt);
	if (!result) return result;
	const parts = result.split("T");
	if (parts.length > 1) {
		return parts[0];
	} else {
		return "";
	}
}

export function utcNow() {
    return formatDatabaseDateTime(new Date());
}

export function encodeSingleQuote(val: string) {
    if (!val) return "";
    return val.replace(/'/g, "''");
}

export function flattenString(s: string) {
	return s.replace(/\n/g, colorText("\\n", "FgGreen"));
}

// ---------------

export function isPromise(p: any) {
	if (
	  p !== null &&
	  typeof p === 'object' &&
	  typeof p.then === 'function' &&
	  typeof p.catch === 'function'
	) {
	  return true;
	}
  
	return false;
}

export function clone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}




export function isArray(val: any) {
    return Object.prototype.toString.call(val) === "[object Array]";
}

export function toBool(val: any): boolean {
    if (val === undefined || val === null) return false;
    return (val && (val === true || val === "true" || val === "1" || val === "True" || val === "y" || val === "Y"));
}

export function toStr(val: any, defaultValue?: string): string {
	if (isStr(val)) return val;
	
    if (val !== null && val !== undefined) {
        return String(val);
    } else {
        return (defaultValue !== undefined) ? defaultValue : "";
    }
}


export function isStr(val: any): boolean {
    return (typeof val === 'string' || val instanceof String);
}

export function toJSON(val: any) {
	if (isStr(val)) {
		try {
			return JSON.parse(val);
		} catch(e) {

		}
	}

	return null;
}

export function tomorrow() {
	const dt = new Date();
	dt.setDate(dt.getDate() + 1);
	const result = toDate(formatDate(dt));
	return result;
}

export function toDate(val: any) {
	let dt = val;
	if (isString(val)) {
		const parts = (val as string).split("-");
		const s = [];
		for(let p of parts) {
			if (p.length === 1) p = "0" + p;
			s.push(p);
		}

		dt = new Date(s.join("-"));
	}

	return dt;
}

export function toRomanNumeral(num: number) {
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
    } as any;
    var str = '';

    const keys = Object.keys(roman);
    for (var i=0;i<keys.length;i++) {
        const k = keys[i];
        var q = Math.floor(num / roman[k]);
        num -= q * roman[k];
        str += k.repeat(q);
    }

    return str;
}

export function toBase26(value: number)
{
	if (value < 0) {
		return "-" + positiveNumberToBase26(Math.abs(value));
	} else {
		return positiveNumberToBase26(value);
	}
}

export function positiveNumberToBase26(value: number) : string {
	if (value < 26) {
		return toBase26Digit(value);
	} else {
		return [
			positiveNumberToBase26(value / 26),
			toBase26Digit(value % 26)
		].join();
	}
}

export function toBase26Digit(value: number) {
	if (value > 25) return "";
	return String.fromCharCode(value + 65);
}











export function clean(value: string, keepChars: string)
{
    var result = "";

    if (!value || value.length <= 0) return "";

    for(var i=0;i<value.length;i++) {
        const c = value.charAt(i);
        if (keepChars.indexOf(c) >= 0) {
            result += c;
        }
    }

    return result;
}



export function invertColor(hex: string) {

    if (hex === "#000" || hex === "#000000") {
        return "#ffffff";
    } else if (hex === "#fff" || hex === "#ffffff") {
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

function rgb2hexColor(rgb: any) {
    return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
}

function dec2hex(n: number) {
    var hex = n.toString(16);
    if (hex.length < 2) {
        return '0' + hex;
    }
    return hex;
}

function hexColor2rgb(color: string) {
    color = color.substring(1); // remove #
    return {
        r: parseInt(color.substring(0, 2), 16),
        g: parseInt(color.substring(2, 4), 16),
        b: parseInt(color.substring(4, 6), 16)
    };
}

function rgb2yuv(rgb: any){
    var y = clamp(rgb.r *  0.29900 + rgb.g *  0.587   + rgb.b * 0.114);
    var u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
    var v = clamp(rgb.r *  0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
    return {y:y, u:u, v:v};
}
  
function yuv2rgb(yuv: any){
    var y = yuv.y;
    var u = yuv.u;
    var v = yuv.v;
    var r = clamp(y + (v - 128) *  1.40200);
    var g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
    var b = clamp(y + (u - 128) *  1.77200);
    return {r:r,g:g,b:b};
}
    
function clamp(n: number){
    if (n<0) { return 0;}
    if (n>255) { return 255;}
    return Math.floor(n);
}

// expect yyyy-m-d format
export function parseDate(val: string) {
	if (!val) return undefined;

	const parts = val.split("-");
	if (parts.length !== 3) return undefined;

	const year = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10) - 1; // js uses month index zero based
	const day = parseInt(parts[2], 10);

	const dt = new Date(year, month, day);
	return dt;
}


