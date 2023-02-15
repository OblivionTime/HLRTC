const WebSocket = require('ws');
const UUID = require('node-uuid');
const HLRTCServer = require('./rtc')

module.exports = function () {
    const RTCWS = new WebSocket.Server({ noServer: true, maxPayload: 5 * 1024 * 1024 * 1024, });
    RTCWS.on('connection', function (socket) {
        socket.name = UUID.v4();
        HLRTCServer.init(socket);
    });
    return RTCWS
};