import Vue from 'vue';
import HLmessage from './index.vue';
const MessageBox = Vue.extend(HLmessage)
let instance
let timer = null
function generateVM(options) {
    // 如果当前处在服务器端，则直接返回
    if (Vue.prototype.$isServer) return;
    // 如果当前定时器已开启，说明页面上已经有一个message-box了，则不能再继续创建新的message-box
    if (timer) return;
    // 初始化实例，并将options作为新的data传入，Vue会将options合并到原有的data上，覆盖原有的默认值，但是，在options中没有设置的是不会被改变的
    instance = new MessageBox({
        data: options
    });
    // 调用$mount方法，将当前实例渲染为真实DOM，生成$el，如果不执行这一步，将拿不到 $el 的值，但是不指定DOM节点接管当前实例
    instance.vm = instance.$mount();
    // 使用原生js的API将当前实例的真实DOM追加到body中
    document.body.appendChild(instance.vm.$el);

    // 开启定时器
    timer = setTimeout(() => {
        timer = null;
    }, instance.vm.duration);
    // 定时器的时间使用vm中定义的时间
    return instance;
}
const Message = function (options = {}) {
    if (typeof options === 'string') {
        options = {
            message: message,

        }
    }
    return generateVM(options)
}

let success = function (message) {
    let options = {
        message: message,
        type: "success"
    }
    return generateVM(options)
};
let info = function (message) {
    let options = {
        message: message,
        type: "info"
    }
    return generateVM(options)
};
let warning = function (message) {
    let options = {
        message: message,
        type: "warning"
    }
    return generateVM(options)
};
let error = function (message) {
    let options = {
        message: message,
        type: "error"
    }
    return generateVM(options)
};
export default {
    message: Message,
    install(Vue) {
        Vue.prototype.$message = Message;
        Vue.prototype.$message.success = success;
        Vue.prototype.$message.info = info;
        Vue.prototype.$message.error = error;
        Vue.prototype.$message.warning = warning;
        Vue.message = Message;
    }
};