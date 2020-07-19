const crawler = require("./crawler")

exports.get = async function(userName){
    if (typeof userName !== "string" || userName.length<=0) return "错误的玩家名";
    let ppplus = await crawler.getPPPlus(userName);
    return ppplus;
};