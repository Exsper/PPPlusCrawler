const crawler = require("./index")

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", async (line) => {
    let ppplus = await crawler.get(line);
    console.log(ppplus + "\n");
});