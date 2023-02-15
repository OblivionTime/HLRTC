let PeerConnection =
    window.PeerConnection ||
    window.webkitPeerConnection00 ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection;
let nativeRTCIceCandidate =
    window.mozRTCIceCandidate || window.RTCIceCandidate;
//ice服务器地址
const iceServer = {
    iceServers: [
        {
            url: "turn:42.192.40.58:3478?transport=udp",
            username: "ddssingsong",
            credential: "123456",
        },
        {
            url: "turn:42.192.40.58:3478?transport=tcp",
            username: "ddssingsong",
            credential: "123456",
        },
    ],
};
import { pcSendOffer, receiveOffer, sendAnswer, receiveAnswer, pcCreateCbGen, pcCreateErrorCb } from './signaling_exchange';
import { initDataChannel } from './data_channel';
import { events } from './events';

export const HLRTC = function (options) {
    const defaultOptions = {
        //服务地址
        server: "ws://192.168.6.28:7880/single",
        //房间号
        room: "123456",
        //类型  
        type: 1, //1表示单聊,2表示群聊,3表示音视频,4表示屏幕共享
        //请求方式
        method: "create", //create创建,join加入
        //是否开启音视频通话
        audio: true,
        video: true,
    }
    const typeOptions = {
        1: "single",
        2: "group",
        4: "video",
        3: "screenshare",
    }
    var HLoptions = { ...defaultOptions, ...options }
    //socket
    this.socket = '';
    //房间号
    this.room = '';
    //所有pc连接容器
    this.peerConnections = []
    //本地视频源
    this.localStream = ''
    //初始化PC
    this.initPC = (socketId) => {
        let pc = new PeerConnection(iceServer);
        pc.onicecandidate = (evt) => {
            if (evt.candidate) {
                this.socket.send(
                    JSON.stringify({
                        eventName: `_ice_candidate`,
                        data: {
                            id: evt.candidate.sdpMid,
                            label: evt.candidate.sdpMLineIndex,
                            sdpMLineIndex: evt.candidate.sdpMLineIndex,
                            candidate: evt.candidate.candidate,
                            socketId: socketId,
                            room: this.room
                        },
                    })
                );
            }
        };

        pc.ondatachannel = (evt) => {
            let channel = evt.channel;
            if (HLoptions.method === "create") {
                channel.onopen = () => {
                    console.log(123123);
                    this.emit('open', socketId);
                };
                channel.onclose = (err) => {
                    this.peerConnections[socketId].channel = null;
                    this.emit('close', socketId);
                };
                channel.onmessage = (message) => {
                    this.emit('message', message.data);
                };

                channel.onerror = (err) => {
                    this.emit('error', err);
                };
                this.peerConnections[socketId].channel = channel
            } else  {
                this.peerConnections[socketId].channel = channel
            }

        }
        pc.onaddstream = (evt) => {
            let stream = evt.stream
            this.emit('streamAdded', stream)

        };

        pc.onicecandidateerror = function (err) {
            console.log(err);
        }
        if (this.localStream) {
            pc.addStream(this.localStream)
        }
        let channel
        if ((HLoptions.type == 1 || HLoptions.type == 2) && HLoptions.method === "join") {
            channel = this.initDataChannel(pc, this.room, socketId)
        }
        this.peerConnections[socketId] = { pc: pc, channel: channel }

    }
    //管道发送消息
    this.SendMessage = (message, type, socketId) => {
        let t = type ? type : 'text';
        if (this.peerConnections[socketId]) {
            if (t == 'text') {
                this.peerConnections[socketId].channel.send(message)
            }
        }
    }
    //连接connect
    this.connect = (server, room) => {
        let socket = new WebSocket(HLoptions.server);
        socket.onopen = async () => {
            if (HLoptions.type == 3) {
                //最新的标准API
                let stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
                this.localStream = stream
                this.emit('streamAdded', stream)
            } else if (HLoptions.type == 4) {
                //最新的标准API
                let stream = await navigator.mediaDevices
                    .getUserMedia({ audio: HLoptions.audio, video: HLoptions.video })
                this.localStream = stream
                this.emit('streamAdded', stream)
            }
            if (HLoptions.method === "create") {
                socket.send(JSON.stringify({
                    "eventName": `_create`,
                    "data": {}
                }));
            } else {
                this.room = HLoptions.room

                socket.send(JSON.stringify({
                    "eventName": `_join`,
                    "data": {
                        "room": this.room,
                        'type': typeOptions[HLoptions.type]
                    }
                }));
            }
        }
        socket.onmessage = async (envent) => {

            try {
                let data = JSON.parse(envent.data);
                let eventName = data.eventName, message = data.data;
                let socketId, room, sendEventName, sdp, name
                switch (eventName) {
                    case `_created`:
                        this.room = message.room;
                        this.emit("getRoom", this.room)

                        break;
                    case `_peer`:
                        socketId = message.socketId;
                        room = message.room
                        this.initPC(socketId)

                        sendEventName = `_offer`
                        this.pcSendOffer({ sendEventName, socketId, room })
                        break;
                    case `_new_peer`:
                        socketId = message.socketId, room = message.room, sendEventName = `_offer`;
                        this.initPC(socketId)
                        break;
                    case `_offer`:
                        //接收到offer
                        socketId = message.socketId, room = message.room, sendEventName = `_answer`, sdp = message.sdp;
                        name = message.name
                        await this.sendAnswer({ sendEventName, socketId, room, sdp })

                        break;
                    case `_answer`:
                        sdp = message.sdp
                        socketId = message.socketId
                        name = message.name
                        //接收到answer
                        this.receiveAnswer(sdp, socketId)
                        break;
                    case `_ice_candidate`:
                        var candidate = new nativeRTCIceCandidate(message);
                        this.peerConnections[message.socketId].pc.addIceCandidate(candidate);
                        break;
                    case `_error`:
                        this.emit('socket_error', message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        socket.onerror = (e) => {
            console.log(e);
        }
        socket.onclose = (e) => {
            this.socket = null;
            this.emit('close', { errMsg: "即将退出聊天室", code: 1000 })

        }
        this.socket = socket
    }
    //关闭连接
    this.closeAllConnections = () => {
        if (this.socket) {
            this.peerConnections = []
            this.socket.send(JSON.stringify({
                "eventName": `_offline`,
                "data": {
                    "room": this.room,
                }
            }));
            this.socket.close();
        }
    }
}
HLRTC.prototype = events;
HLRTC.prototype.initDataChannel = initDataChannel;
/***********************信令交换部分*******************************/

HLRTC.prototype.pcCreateCbGen = pcCreateCbGen
HLRTC.prototype.pcCreateErrorCb = pcCreateErrorCb
HLRTC.prototype.pcSendOffer = pcSendOffer
HLRTC.prototype.receiveOffer = receiveOffer
HLRTC.prototype.sendAnswer = sendAnswer
HLRTC.prototype.receiveAnswer = receiveAnswer
