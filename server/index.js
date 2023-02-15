const url = require('url');
var app = require('./app/app');
const RTCSERVER = require('./server/HLRTC')();
const defaultOptions = {
    //启动https
    https: true,
    //主机
    host: 'localhost',
    //端口
    port: '3080',
    //路由
    path: '/hljs',
    //最大传输大小
    maxPayload: 10 * 1024 * 1024,
    //重连时间 默认30s
    pingInterval: 30000,
    //证书地址
    certPath: './mkcert/server.key',
    keyPath: './mkcert/server.crt'
}

function HLwebRTC(options) {
    HLoptions = { ...defaultOptions, ...options }
    let server
    if (HLoptions.https) {
        let fs = require("fs");
        const httpsOption = {
            key: fs.readFileSync(HLoptions.certPath),
            cert: fs.readFileSync(HLoptions.keyPath)
        }
        server = require("https").createServer(httpsOption, app);
    } else {
        server = require("http").createServer(app);
    }
    // 协议提升
    server.on('upgrade', (request, socket, head) => {
        const pathname = url.parse(request.url).pathname;
        // 处理键盘指令的websocket
        if (pathname === '/rtc') {
            RTCSERVER.handleUpgrade(request, socket, head, socket => {
                RTCSERVER.emit('connection', socket, request);
            });
        }
    });
    //启动服务
    server.listen("7880", "0.0.0.0", function () {
        console.log(`websocket running at wss://127.0.0.1:7880`);
    });
}
HLwebRTC()