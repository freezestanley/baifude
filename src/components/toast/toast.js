import Vue from 'vue';
import ToastVue from './Toast.vue';

const Toast = {
    list: [],
    show(options = {}){
        let instance = new Vue({
            ...ToastVue,
            el: document.createElement('div')
        });

        if(options.hideAll){
            this.hideAll();
        }

        this.list.push(instance);

        Object.keys(options).forEach(key => {
            instance[key] = options[key];
        });

        document.body.appendChild(instance.$el);
        Vue.nextTick(function() {

            instance.timer && clearTimeout(instance.timer);

            instance.timer = setTimeout(() => {
                instance.isShow = false;
            }, instance.duration)

        });
    },
    hideAll(){
        this.list.forEach(val => {
            val.hide();
        });
        this.list = [];
    }
}


export default Toast;
