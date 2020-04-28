<template>
    <section class="boutique">
        <div class="boutique-wrap">
            <!--<div class="boutique-item" v-for="(item,index) in data" :key="index">-->
                <!--<img :src="item.h5ImagePath" alt="">-->
            <!--</div>-->
            <div class="boutique-wrap-left" @click="jumpUrl(data[0].h5RedirectUrl)">
                <img :src="data[0].h5ImagePath" alt="">
            </div>
            <div class="boutique-wrap-right">
                <div class="boutique-wrap-smallPic" @click="jumpUrl(data[1].h5RedirectUrl)">
                    <img :src="data[1].h5ImagePath" alt="">
                </div>
                <div class="boutique-wrap-smallPic" style="margin-top: 8px" @click="jumpUrl(data[2].h5RedirectUrl)">
                    <img :src="data[2].h5ImagePath" alt="">
                </div>
            </div>
        </div>
        <!--<div v-else-if="data.length == 2">-->
            <!--<div></div>-->
        <!--</div>-->
        <!--<div v-else-if="data.length == 3">-->
            <!--<div></div>-->
        <!--</div>-->
        <!--<div v-else>-->
            <!--<div></div>-->
        <!--</div>-->
    </section>
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
    created(){
      console.log("data---====",this.data)
    },
    methods:{
      jumpUrl(item){
        window.location.href=item;
      }
    },
  }
</script>

<style lang="less" scoped>
.boutique-wrap{
    padding: 10px 0 0 0;
    display: flex;
    justify-content: space-between;
    .boutique-wrap-left{
        width: 160px;
        height: 180px;
        img{
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 4px;
        }
    }
    .boutique-wrap-right{
        width: 175px;
        height: auto;
        .boutique-wrap-smallPic{
            height: 86px;
            width: 100%;
            img{
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
        }
    }
    /*.boutique-item{*/
        /*width: 100%;*/
        /*height:150px;*/
        /*background: pink;*/
        /*img{*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*display: block;*/
        /*}*/
    /*}*/
}

</style>