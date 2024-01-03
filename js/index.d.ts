export declare function uuid(): string;
export declare function hash(data: string): string;
export declare function first(array: any[]): any;
export declare function toInt(val: any, valDefault?: number): number | undefined;
export declare function isObject(val: any): boolean;
export declare function isString(val: any): boolean;
export declare function formatDateTime(dt: Date): string;
export declare function encodeSingleQuote(val: string): string;
export declare function withoutKey(objects: any[], fn: () => void): void;
