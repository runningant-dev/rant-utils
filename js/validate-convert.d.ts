export declare function toInt(val: any, valDefault?: number): number | undefined;
export declare function toFloat(val: any): number;
export declare function toNumber(val: any, defaultVal?: number): number;
export declare function isObject(val: any): boolean;
export declare function isString(val: any): boolean;
export declare function isValidDate(date: any): any;
export declare function formatDatabaseDateTime(dt: Date): string;
export declare function utcNow(): string;
export declare function encodeSingleQuote(val: string): string;
export declare function flattenString(s: string): string;
export declare function isPromise(p: any): boolean;
export declare function clone(obj: any): any;
export declare function isArray(val: any): boolean;
export declare function toBool(val: any): boolean;
export declare function toStr(val: any, defaultValue?: string): string;
export declare function isStr(val: any): boolean;
export declare function toJSON(val: any): any;
export declare function tomorrow(): any;
export declare function toDate(val: any): any;
export declare function toRomanNumeral(num: number): string;
export declare function toBase26(value: number): string;
export declare function positiveNumberToBase26(value: number): string;
export declare function toBase26Digit(value: number): string;
export declare function clean(value: string, keepChars: string): string;
export declare function invertColor(hex: string): string;
export declare function parseDate(val: string): Date | undefined;
