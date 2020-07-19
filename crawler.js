const https = require('https');
const querystring = require('querystring');
const PPPlus = require("./PPPlus");

class crawler {
    static apiRequest(userName) {
        userName = querystring.escape(userName);
        return new Promise((resolve, reject) => {
            const requestOptions = {
                host: 'syrin.me',
                port: 443,
                type: 'https',
                method: 'GET',
                path: '/pp+/u/' + userName + "/",
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            }
            let _data = '';

            // console.log("发送请求：" + requestOptions.host + requestOptions.path);

            const req = https.request(requestOptions, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    _data += chunk;
                });
                res.on('end', function () {
                    resolve(_data);
                });
                res.on('error', function (e) {
                    console.dir('problem with request: ' + e.message);
                    reject(e)
                });
            });
            req.end();
        })
    }

    static async getPPPlus(userName) {
        return await this.apiRequest(userName).then(data => {
            try {
                if (!data) throw "无法访问pp+网页";
                let poi = data.indexOf('div class="performance-table"');
                if (poi <0) return "找不到pp+信息，请检查玩家名";
                const panel = data.substr(poi, 1000);

                let ppplusData = {};

                let res = /Performance:<\/th><th>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.Performance = parseInt(res);

                res = /Aim \(Total\):<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.AimTotal = parseInt(res);

                res = /Aim \(Jump\):<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.AimJump = parseInt(res);

                res = /Aim \(Flow\):<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.AimFlow = parseInt(res);

                res = /Precision:<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.Precision = parseInt(res);

                res = /Speed:<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.Speed = parseInt(res);

                res = /Stamina:<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.Stamina = parseInt(res);

                res = /Accuracy:<\/td><td>(.{1,20})pp/.exec(panel)[1].replace(/,/g, "");
                ppplusData.Accuracy = parseInt(res);

                return new PPPlus(ppplusData).OutputNewCost();
            }
            catch (ex) {
                console.log(ex);
                return "获取pp+失败";
            }
        });
    }



}

module.exports = crawler;
