<template>
    <div class="container">
        <div class="box" :style="boxTransition">
            <div v-if="show" class="box-content">
                <div class="box-title">选择你要进行的操作</div>
                <div class="content">
                    <select class="content-select" v-model="selectValue">
                        <option :value="item.value" v-for="item in options" :key="item.value">{{ item.label }}</option>
                    </select>
                </div>
                <div class="footer">
                    <button class="light-btn" @click="nextPage">next</button>
                </div>
            </div>
            <div v-else>
                <img src="../../assets/circle.png" alt="" srcset="" style="width: 200px;" v-if="showImg">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "enter",
    data() {
        return {
            options: [{ label: "私聊", value: "single" },{ label: "群聊", value: "group" }, { label: "屏幕共享", value: "screenshare" }, { label: "视频共享", value: "video" }],
            boxTransition: "display:flex;justify-content:center;align-items:center",
            show: true,
            showImg: false,
            selectValue: 'single'
        };
    },
    mounted() {

    },
    methods: {
        nextPage() {
            this.show = false;
            this.boxTransition = "transition: all 1s ease-out; width: 200px;height: 200px;border-radius: 100vw; "
            setTimeout(() => {
                this.showImg = true
                setTimeout(() => {
                    this.boxTransition = "transition: all 4s ease-out; width: 200px;height: 200px;border-radius: 100vw;transform:translateX(1100px) rotate(1turn);"
                    setTimeout(() => {
                        this.$router.push({
                            name: 'join',
                            params: {
                                method: this.selectValue
                            }
                        });
                    }, 2000);
                }, 500);

            }, 1000);
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: down 1s ease-out;

    .box {
        width: 450px;
        height: 300px;
        border-radius: 20px;
        background-color: #fff;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;

        .box-content {
            .box-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .content {
                width: 260px;
                height: 50px;
                margin: 0 auto;

                .content-select {
                    width: 100%;
                    height: 100%;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    padding: 0 10px;
                }
            }

            .footer {
                position: relative;
                margin-top: 40px;

                .light-btn {
                    position: relative;
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 24px;
                    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
                    background-size: 400%;
                    width: 260px;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    text-align: center;
                    text-transform: uppercase;
                    border-radius: 50px;
                    z-index: 1;
                }

                .light-btn:hover::before,
                .light-btn:hover {
                    animation: sun 8s infinite;
                }

                .light-btn::before {
                    content: '';
                    position: absolute;
                    left: -5px;
                    right: -5px;
                    top: -5px;
                    bottom: -5px;
                    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
                    background-size: 400%;
                    border-radius: 50px;
                    filter: blur(10px);
                    z-index: -1;
                }

                @keyframes sun {
                    100% {
                        background-position: -400% 0;
                    }
                }
            }
        }


    }

    @keyframes down {
        0% {
            transform: translate3d(0, -100vh, 0);
        }

        100% {
            transform: translate3d(0, 0, 0);
        }
    }
}
</style>