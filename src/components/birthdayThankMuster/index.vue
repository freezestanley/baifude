<template>
    <div class="birthday-thank-wrap">
        <div class="birthday-thank-item" v-for="(item,index) in data" :key="index">
            <img :src="item.bgPic" alt="">
            <div class="item-text">
                <div class="item-text-title">{{item.name}}</div>
                <div class="item-text-desc" :class="[item.module == 'birthDay'?'color_b':'color_t']">{{item.des}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
  }
</script>

<style scoped lang="less">
.birthday-thank-wrap{
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    .birthday-thank-item{
        width: 165px;
        height:78px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .item-text{
            width: 165px;
            height:78px;
            position: absolute;
            left:0;
            top:0;
            .item-text-title{
                font-size: 16px;
                font-weight: bold;
                color:#223250;
                margin: 15px 0 15px 10px;
            }
            .item-text-desc{
                font-size: 12px;
                margin-left: 10px;
            }
        }
    }
    .color_b{
        color:#827166;
    }
    .color_t{
        color: #6B798C;
    }
}
</style>