<template>
    <div class="container">
        <div class="chat-title">
            <div class="chat-title-logo">
                <img src="@/assets/logo.png" alt="" @click="backPage">
            </div>
            <div class="chat-title-room">房间号:{{ room }}</div>
        </div>
        <div class="main">
            <div class="main-video"> <video controls="true" class="video" id="mainVideo" autoplay="true"></video> </div>
            <div class="main-right" id="otherVideo">
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
            mediaList: [],
            src: '',
            HLrtc: '',
            connect: false,
            selectValue: '',
            Type: '',
            room: '',
            typeOptions: {
                "single": 1,
                "group": 2,
                "video": 4,
                "screenshare": 3,
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
        this.init();
    },
    methods: {
        backPage() {
            this.$router.go(-1)
        },
        //初始化
        init() {
            this.HLrtc = new HLRTC({ method: this.selectValue, room: this.room, server: `wss://192.168.6.28:7880/rtc`, type: this.typeOptions[this.Type] });
            this.HLrtc.on('getRoom', (room) => {
                this.room = room;
            })
            this.HLrtc.on('streamAdded', (stream) => {
                if (this.mediaList.length == 0) {
                    let video = document.getElementById('mainVideo')
                    video.srcObject = stream
                }
                const otherTag = document.createElement('div');
                otherTag.classList.add('main-right-item');
                const othervideo = document.createElement('video');
                othervideo.srcObject = stream;
                othervideo.controls = true;
                othervideo.autoplay = true;
                othervideo.style.width = "100%";
                othervideo.style.height = "100%";
                othervideo.classList.add('video');
                let otherVideoTag = document.getElementById('otherVideo')
                otherTag.appendChild(othervideo)
                otherVideoTag.appendChild(otherTag)
                this.mediaList.push(stream)
            })
            this.HLrtc.connect()
        },

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
.container {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;

    overflow: hidden;

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

    .main {
        display: flex;
        justify-content: space-between;

        .main-video {
            width: 70vw;
            height: 90vh;

            .video {
                width: 100%;
                height: 100%;
            }

        }

        .main-right {
            height: 90vh;
            overflow: auto;
            display: grid;
            grid-template-columns: repeat(1, auto);
            grid-gap: 10px;
            width: 25vw;

            .main-right-item {
                .video {
                    width: 100%;
                    height: 95%;
                }
            }


        }
    }


    ::-webkit-scrollbar {
        display: none;
    }

}
</style>