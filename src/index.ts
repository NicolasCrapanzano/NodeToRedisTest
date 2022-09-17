import fs from "fs";
import * as redis from "redis";
import express from "express";

const devurl = "redis://127.0.0.1:6379"
const client = redis.createClient( {url: process.env.REDIS_URL || devurl} );
const app = express();

client.on('error', (err) => console.log('Redis Client Error', err));


connect();
const fileName: string = "./src/sample.txt";
const key: string = "text";

main();
function main(){
    console.log("starting node process");
    setToDB(key, readfile(fileName));
    setTimeout(() => {
        console.log("trying to get data from db");
        getDataFromDB();
    },5000)
}

async function connect(){
    await client.connect();
}

function readfile(filename: string){
    let data = fs.readFileSync(filename, "utf8");
    return data;
}

function setToDB(key: string,data: string){
    console.log("key has been set");
    client.setEx(key, 10, data);
}

async function getDataFromDB(){
    let data = await client.get('text');
    console.log("data from db: ",data);
}

function deleteDataFromDB(key: string){
    console.log("deleting: ",key);
    client.del(key);
}

function exportRedisData(){
    let exportFile: string = "";
    let content: string = "";
    fs.writeFile(exportFile, content, err =>{
        if (err){
            console.error(err);
            return;
        }
    })

}

app.listen(process.env.PORT || 3001);