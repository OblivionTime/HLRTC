export function initDataChannel(pc, room, socketId) {
    let channel = pc.createDataChannel(room)
    channel.onopen = () => {
        this.emit('open', socketId);
    };

    channel.onclose = (err) => {
        channel = null
        this.emit('close', socketId);

    };

    channel.onmessage = (message) => {
        this.emit('message', message.data);
    };

    channel.onerror = (err) => {
        this.emit('error', err);
    };
    return channel;
}
