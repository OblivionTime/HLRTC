<template>
    <div class="chat-container" :style="chatTransition" id="chat">
        <div class="chat-box">
            <div class="chat-cover"></div>
            <div class="chat-title">
                <div class="chat-title-logo" @click="backPage">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <div class="chat-title-room">房间号:{{ room }}</div>
            </div>
            <div class="chat-content" ref="record">
                <div :class="item.identity" v-for="item in chatList" :key="item.id">
                    <div class="avatar">
                        <img :src="item.avatar" alt="" srcset="" width="60px" height="60px">
                    </div>
                    <div class="aChat" style="white-space: pre-wrap;">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="chat-footer">
                <div class="send"><button class="send-btn" :class="sendMessage && connect ? '' : 'send-btn-disabled'"
                        @click="SendMessage">发送</button></div>
                <div>
                    <textarea rows="3.5" class="respond" v-model="sendMessage" :disabled="!connect"
                        @keyup="onKeyUp"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HLRTC } from '@/HLRTC/HLRTC.js'
export default {
    name: "chat",
    data() {
        return {
            chatList: [],
            avatar: '',
            HLrtc: '',
            sendMessage: "",
            connect: false,
            chatTransition: '',
            closeWindow: false,
            selectValue: '',
            Type: '',
            room: '',
            backFlag: false,
            socketIdList: [],
            typeOptions: {
                "single": 1,
                "group": 2,
                "video": 3,
                "screen": 4,
            }
        };
    },
    created() {
        this.selectValue = this.$route.params.selectValue
        this.Type = this.$route.params.Type

        if (this.$route.params.selectValue == 'join') {
            this.room = this.$route.query.room
        }
    },
    mounted() {
        let rand = Math.floor(Math.random() * 41 + 1)
        this.avatar = require(`@/assets/avatar/${rand}.jpg`)
        let beforeunloadFn = () => {
            alert(123)
            if (this.HLrtc) {
                this.HLrtc.closeAllConnections()
                this.HLrtc = null

            }
            window.removeEventListener('beforeunload', beforeunloadFn, false)
        }
        window.addEventListener('beforeunload', beforeunloadFn, false)
        this.init();
    },
    updated() {
        this.$nextTick(() => {
            this.$refs.record.scrollTop = this.$refs.record.scrollHeight;
        });
    },
    methods: {
        backPage() {
            this.$router.go(-1)
        },
        //初始化
        init() {
            let host = "localhost:7880"
            if (process.env.NODE_ENV != 'development') {
                host = window.location.host
            }
            this.HLrtc = new HLRTC({ method: this.selectValue, room: this.room, server: `wss://${host}/rtc`, type: this.typeOptions[this.Type] });
            this.HLrtc.on('getRoom', (room) => {
                this.room = room;
            })
            this.HLrtc.connect()
            this.DataChannelOnOpen()
            this.DataChannelOnMessage()
            this.DataChannelOnClose()
            this.DataChannelOnError()
        },
        //信息管道开启
        DataChannelOnOpen() {
            this.HLrtc.on('open', (socketId) => {
                this.connect = true
                this.socketIdList.push(socketId)
            });
        },
        DataChannelOnMessage() {
            this.HLrtc.on('message', (data) => {
                let message = JSON.parse(data)
                console.log(message);

                this.chatList.push({
                    content: message.content,
                    time: new Date().getTime(),
                    type: 'text',
                    identity: 'other',
                    id: this.chatList.length,
                    avatar: message.avatar
                })
            });
        },
        DataChannelOnClose() {
            this.HLrtc.on('close', (socketId) => {
                console.log("断开连接");
                this.socketIdList.splice(this.socketIdList.indexOf(socketId), 1)
                this.connect = false
            });
        },
        DataChannelOnError() {
            this.HLrtc.on('error', (error) => {
                console.log(error);
                // this.$message.error("连接断开");
                this.connect = false
            });
            this.HLrtc.on('socket_error', (error) => {
                this.$message.error(error.errMsg);
            })
        },
        //发送消息
        SendMessage() {
            if (this.sendMessage == '') {
                return
            }
            if (!this.HLrtc || !this.connect) {
                alert('连接失败,无法发送消息');
                return
            }
            let sendMessage = this.sendMessage.replace(/^\s+|\s+$/g, "")
            for (const socketId of this.socketIdList) {
                this.HLrtc.SendMessage(JSON.stringify({
                    content: sendMessage,
                    avatar: this.avatar
                }), 'text', socketId
                );
            }
            this.chatList.push({
                content: sendMessage,
                time: new Date().getTime(),
                type: 'text',
                identity: 'self',
                id: this.chatList.length,
                avatar: this.avatar
            })
            this.sendMessage = ""
        },
        //onKeyUp
        onKeyUp(e) {
            if (e.ctrlKey && e.keyCode == 13) {
                this.SendMessage()
            }
        }
    },
    destroyed() {
        if (this.HLrtc) {
            this.HLrtc.closeAllConnections()
            this.HLrtc = null
        }

    },
}
</script>

<style lang="scss" scoped>
.chat-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: show 1s ease-out;

    .chat-box {
        width: calc(95% - 40px);
        height: calc(95% - 40px);
        border-radius: 20px;
        position: relative;
        padding: 20px;
        background: url(../../assets/bg.jpg) no-repeat center;
        background-size: cover;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        .chat-cover {
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(5px);
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 20px;
        }

        .chat-title {
            font-size: 28px;
            font-weight: bold;
            color: #000;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .chat-title-logo img {
                cursor: pointer;
                width: 90px;
                height: 28px;
                object-position: center;
                object-fit: cover;
            }

            .chat-title-room {
                font-size: 20px;
                margin-right: 40px;
                letter-spacing: 2px;

            }
        }

        .chat-content {
            width: 100%;
            height: 75%;
            overflow: auto;
            position: relative;
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);

            .other {
                display: flex;
                align-items: center;
                margin: 20px 0;

                .avatar img {
                    border-radius: 10px;
                    margin: 0 10px;
                }

                .aChat {
                    word-break: break-all;
                    max-width: 40%;
                    padding: 10px;
                    background-color: #fff;
                    position: relative;
                    box-shadow: 0px 2px 7px 0px rgba(123, 123, 123, 0.17);
                    border: solid 1px #fff;
                    border-radius: 4px;
                    text-indent: -6px;

                    &::before,
                    ::after {
                        content: "";
                        position: absolute;
                        top: calc(50% - 6px);
                        border-top: 6px solid transparent;
                        border-bottom: 6px solid transparent;
                    }

                    &::before {
                        left: -10px;
                        border-right: 10px solid #fff;
                    }

                    &::after {
                        left: -8px;
                        border-right: 10px solid transparent;
                    }
                }
            }

            .self {
                display: flex;
                align-items: center;
                margin: 20px 0;
                flex-direction: row-reverse;

                .avatar img {
                    border-radius: 10px;
                    margin: 0 10px;
                }

                .aChat {
                    word-break: break-all;
                    max-width: 40%;
                    padding: 10px;
                    background-color: #95ec69;
                    position: relative;
                    box-shadow: 0px 2px 7px 0px rgba(123, 123, 123, 0.17);
                    border: solid 1px #95ec69;
                    border-radius: 4px;
                    text-indent: -6px;

                    &::before,
                    ::after {
                        content: "";
                        position: absolute;
                        top: calc(50% - 6px);
                        border-top: 6px solid transparent;
                        border-bottom: 6px solid transparent;
                    }

                    &::before {
                        right: -10px;
                        border-left: 10px solid #95ec69;
                    }

                    &::after {
                        left: -8px;
                        border-left: 10px solid transparent;
                    }
                }
            }
        }

        .chat-footer {
            position: relative;
            padding: 10px;

            .send {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;

                .send-btn {
                    width: 80px;
                    height: 30px;
                    background-color: #228be6;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;

                }

                .send-btn-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    // pointer-events: none;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }

            .respond {
                width: 99%;
                min-height: 50px;
                resize: none;
                border-radius: 10px;
                border: none;
                padding: 10px;
            }
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }

    @keyframes show {
        0% {
            opacity: 0;
            transform: scale(0)
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes hidden {
        0% {
            opacity: 1;
            transform: scale(1);
        }

        100% {
            opacity: 0;
            transform: scale(0)
        }


    }
}
</style>