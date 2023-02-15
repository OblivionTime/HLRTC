
let nativeRTCSessionDescription =
    window.mozRTCSessionDescription || window.RTCSessionDescription;
//pcCreateCbGen创建成功返回函数
function pcCreateCbGen(options, pc) {
    let { sendEventName, socketId, room } = options
    return (session_desc) => {
        pc.setLocalDescription(session_desc);
        this.socket.send(
            JSON.stringify({
                eventName: sendEventName,
                data: {
                    sdp: session_desc,
                    socketId: socketId,
                    room: room,
                },
            })
        );
    };
}
//pcCreateErrorCb创建失败回调函数
function pcCreateErrorCb(err) {
    console.log(err);
}
//向所有PeerConnection发送Offer类型信令
function pcSendOffer(options) {
    let pc = this.peerConnections[options.socketId].pc
    pc.createOffer(this.pcCreateCbGen(options, pc), this.pcCreateErrorCb);
}
//接收到Offer类型信令后作为回应返回answer类型信令
function receiveOffer(options) {
    sendAnswer(options);
};
//发送answer类型信令
function sendAnswer(options) {
    let { sdp ,socketId} = options
    let pc = this.peerConnections[socketId].pc
    pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
    pc.createAnswer(this.pcCreateCbGen(options, pc), this.pcCreateErrorCb);
}
//接收到answer类型信令后将对方的session描述写入PeerConnection中
function receiveAnswer(sdp, socketId) {
    this.peerConnections[socketId].pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
}
export { pcSendOffer, receiveOffer, sendAnswer, receiveAnswer, pcCreateCbGen, pcCreateErrorCb }