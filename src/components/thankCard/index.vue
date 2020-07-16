<template>
    <div class="thank-card-wrap">
       <div class="thank-card-item" v-for="(item,index) in data" :key="index">
           <div class="item-left">
               <div class="user-pic"></div>
               <div class="user-name">{{item.name}}</div>
           </div>
           <div class="item-right">
               <div class="card-time"></div>
               <div class="card-name"></div>
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
    .thank-card-wrap{
        /*padding: 0 15px;*/
        .thank-card-item{
            width: 100%;
            height: 44px;
            display: flex;
            .item-left{
                width: 50%;
                min-width: 50%;
                max-width: 50%;
                display: flex;
                align-items: center;
                .user-pic{
                    width: 30px;
                    height:30px;
                    background-color: yellowgreen;
                    border-radius: 50%;
                }
                .user-name{
                    font-size: 14px;
                    color: #111111;
                    margin-left: 4px;
                }
            }
            .item-right{
                width: 50%;
                min-width: 50%;
                max-width: 50%;
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666666;
                .card-time{

                }
            }
        }

    }
</style>