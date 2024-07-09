"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid4 = exports.uuid = exports.hash = void 0;
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
__exportStar(require("./array"), exports);
__exportStar(require("./colorText"), exports);
__exportStar(require("./format"), exports);
__exportStar(require("./object"), exports);
__exportStar(require("./validate-convert"), exports);
function hash(salt, value) {
    return crypto_1.default.createHmac("sha256", salt).update(value).digest("hex");
}
exports.hash = hash;
function uuid() {
    return (0, uuid_1.v1)();
}
exports.uuid = uuid;
function uuid4() {
    return (0, uuid_1.v4)();
}
exports.uuid4 = uuid4;
