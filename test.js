const crawler = require("./crawler")

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", async (line) => {
    let ppplus = await crawler.getPPPlus(line);
    console.log(ppplus + "\n");
});