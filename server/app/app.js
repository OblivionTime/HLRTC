var express = require('express');
const bodyParser = require("body-parser");
const rtc_server = require('../server/HLRTC/rtc');
var app = express();
app.use(bodyParser.json()); //parse application/json
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Accept,Content-type");
    res.header("Access-Control-Allow-Credentials", true);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8")
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
});
app.get("/", function (req, res) {
    res.send("开启!!!!!!!")
})
app.get('/one', (req, res) => {
    var { room, type } = req.query
    let err=rtc_server.findRoom(room)
    let resp
    if (!err) {
        resp = {
            code: 0,
            message: "success",
        }
    } else {
        resp = {
            code: 1,
            message: err,
        }
    }
    res.send(JSON.stringify(resp))
})
module.exports = app