import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export * from "./array";
export * from "./colorText";
export * from "./format";
export * from "./object";
export * from "./validate-convert";

export function hash(salt: string, value: string) {
    return crypto.createHmac("sha256", salt).update(value).digest("hex");
}

export function uuid() {
    return uuidv1();
}
export function uuid4() {
    return uuidv4();
}

