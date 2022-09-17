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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const redis = __importStar(require("redis"));
const express_1 = __importDefault(require("express"));
const devurl = "redis://127.0.0.1:6379";
const client = redis.createClient({ url: process.env.REDIS_URL || devurl });
const app = (0, express_1.default)();
client.on('error', (err) => console.log('Redis Client Error', err));
connect();
const fileName = "./src/sample.txt";
const key = "text";
main();
function main() {
    setToDB(key, readfile(fileName));
    setTimeout(() => {
        getDataFromDB();
    }, 5000);
}
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
function readfile(filename) {
    let data = fs_1.default.readFileSync(filename, "utf8");
    return data;
}
function setToDB(key, data) {
    client.setEx(key, 10, data);
}
function getDataFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield client.get('text');
        console.log("data from db: ", data);
    });
}
function deleteDataFromDB(key) {
    console.log("deleting: ", key);
    client.del(key);
}
function exportRedisData() {
    let exportFile = "";
    let content = "";
    fs_1.default.writeFile(exportFile, content, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}
app.listen(process.env.PORT || 3001);
