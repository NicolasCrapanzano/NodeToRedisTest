"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
console.log("hello world");
const fileName = "./src/sample.txt";
fs_1.default.readFile(fileName, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("data: ", data);
});
