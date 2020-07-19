const crawler = require("./crawler")

exports.get = async function(userName){
    let ppplus = await crawler.getPPPlus(userName);
    return ppplus;
};