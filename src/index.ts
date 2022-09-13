import fs from "fs";
console.log("hello world");

const fileName = "./src/sample.txt";
fs.readFile(fileName, "utf8", (err, data) =>{
    if(err){
        console.error(err);
        return;
    }
    console.log("data: ",data);
});

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