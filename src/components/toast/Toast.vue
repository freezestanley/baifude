<!--
import Toast from 'common/components/toast';
Toast.show({
    content: '自定义信息',
    isSuccess: true,
    duration: 3000
});
 -->
<template>
    <transition name="fade" mode="out-in" appear>
        <div v-if="isShow">
            <div class="ui-toast" :class="{'ui-toast-success': isSuccess}">
                <div class="icon icon-success" v-if="isSuccess"></div>
                {{ content }}
            </div>
        </div>

    </transition>
</template>

<script>
export default {
    data(){
        return {
            isShow: true
        }
    },
    props: {
        content: String,
        isSuccess: {
            default: false,
            type: Boolean
        },
        duration: {
            type: Number,
            default: 3000
        }
    },
    methods: {
        hide(){
            this.timer && clearTimeout(this.timer);
            this.isShow = false;
        }
    }
}
</script>

<style lang="less">
.ui-toast{
    z-index: 99999;
    position: fixed;
    font-size: .3rem;
    /*width: 2.8rem;*/
    padding: .34rem;
    box-sizing: border-box;
    background: #000;
    opacity: .7;
    border-radius: .1rem;
    left: 50%;
    top: 50%;
    color: #fff;
    text-align: center;
    transform: translate(-50%, -50%);
    line-height: .4rem;
    .icon{
        margin: 0 auto .1rem;
        width: .81rem;
        height: .81rem;
    }
    // .icon-success{
    //     background: url("../assets/icon-toast-success.png");
    //     background-size: 100%;
    // }
    &.ui-toast-success{
        height: 2rem;
    }
}
</style>