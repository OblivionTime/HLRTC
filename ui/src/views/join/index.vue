<template>
    <div class="container">
        <div class="box" :style="boxTransition">
            <div class="box-content">
                <div class="box-title">请选择加入/创建房间</div>
                <div class="content">
                    <select class="content-select" v-model="selectValue">
                        <option :value="item.value" v-for="item in options" :key="item.value">{{ item.label }}</option>
                    </select>
                    <div v-if="selectValue == 'join'">
                        <input type="text" placeholder="房间号" v-model="room" class="content-input">
                    </div>
                </div>
                <div class="footer">
                    <button class="light-btn" @click="EnterChat">next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';
export default {
    name: "enter",
    data() {
        return {
            options: [{ label: "创建", value: "create" }, { label: "加入", value: "join" }],
            boxTransition: "display:flex;justify-content:center;align-items:center",
            selectValue: 'create',
            selectValueType: 'single',
            show: false,
            room: '',
        };
    },
    mounted() {
        this.selectValueType = this.$route.params.method
    },
    methods: {
        EnterChat() {
            if (this.selectValue == 'join') {
                request({
                    url: `/one`,
                    method: 'get',
                    params: {
                        room: this.room,
                        type: this.selectValueType
                    }
                })
                    .then((res) => {
                        if (res.code == 0) {
                            this.boxTransition = "transition: all 1s ease-out;opacity:0"
                            setTimeout(() => {
                                if (this.selectValueType == 'single' || this.selectValueType == 'group') {
                                    this.$router.push({ name: 'chat', query: { room: this.room }, params: { selectValue: this.selectValue, Type: this.selectValueType } })
                                } else {
                                    this.$router.push({ name: 'media', query: { room: this.room }, params: { selectValue: this.selectValue, Type: this.selectValueType } })

                                }
                            }, 1000);
                        } else {
                            this.$message.error(res.message);

                        }
                    })
            } else {
                this.boxTransition = "transition: all 1s ease-out;opacity:0"
                setTimeout(() => {
                    if (this.selectValueType == 'single' || this.selectValueType == 'group') {
                        this.$router.push({ name: 'chat', params: { selectValue: this.selectValue, Type: this.selectValueType } })
                    } else {
                        this.$router.push({ name: 'media', params: { selectValue: this.selectValue, Type: this.selectValueType } })
                    }
                }, 1000);
            }

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
                margin: 0 auto;
                // height: 100px;
                transition: all 1s ease-out;

                .content-select {
                    width: 100%;
                    height: 50px;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    padding: 0 10px;
                }

                .content-input {
                    width: calc(100% - 20px);
                    height: 50px;
                    font-size: 16px;
                    font-weight: bold;
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