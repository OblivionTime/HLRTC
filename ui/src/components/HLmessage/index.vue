<template>
    <div>
        <div class="tip-dialog" v-if="show" :style="'background-color: ' + IcoList[type].bg + ';'"
            :class="tipsDuration ? 'show-tip' : 'not-show-tip'">
            <div class="message-content" :style="'color: ' + IcoList[type].fontColor + ';'">
                <div class="tip-img" :style="'background-image: url(' + IcoList[type].icon + ');'"></div>
                <div class="message-text">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HLmessage",
    watch: {
        async show(o) {
            if (o) {
                setTimeout(() => {
                    this.tipsDuration = false
                    setTimeout(() => {
                        this.show = false
                    }, 500)
                }, this.duration)
            }
        }
    },
    mounted() {
        this.show = true
        setTimeout(() => {
            this.tipsDuration = true
        }, 50)
    },
    data() {
        return {
            /**
            * 提示弹窗相关参数
            */
            type: 'success',
            duration: 2000,
            message:"",
            show: false,
            tipsDuration: false,
            IcoList: {
                'success': {
                    icon: require("./assets/color-success.png"),
                    bg: '#f0f9eb',
                    fontColor: '#79c278'
                },
                'error': {
                    icon: require("./assets/error.png"),
                    bg: '#fef0f0',
                    fontColor: '#f9926c'
                },
                'info': {
                    icon: require("./assets/info-circle.png"),
                    bg: '#edf2fc',
                    fontColor: '#909399'
                },
                'warning': {
                    icon: require("./assets/warning.png"),
                    bg: '#fdf6ec',
                    fontColor: '#e6a27a'
                },
            }
        }
    },
}
</script>

<style  scoped>
.tip-dialog {
    width: 30%;
    min-height: 5vh;
    padding: 20px;
    position: absolute;
    top: 20px;
    right: 0;
    left: 0;
    margin: 0 auto;
    font-size: 16px;
    display: flex;
    align-items: center;
    transition: opacity 1s ease;
    border-radius: 10px;

}

.show-tip {
    opacity: 1;
}

.not-show-tip {
    opacity: 0;
}

.message-content {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 50px;

}

.tip-img {
    width: 16px;
    height: 16px;

    background-size: cover;
    background-repeat: no-repeat;
}

.message-text {
    width: 80%;
}
</style>