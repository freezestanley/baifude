<template>
    <div class="thank-card-wrap">
       <div class="thank-card-item" v-for="(item,index) in data" :key="index">
           <div class="item-left">
               <div class="user-pic"></div>
               <div class="user-name">{{item.name}}</div>
           </div>
           <div class="item-right">
               <div class="card-time">{{item.date}}</div>
               <div class="card-name">{{`「${item.cardText}」`}}</div>
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
                width: 40%;
                min-width: 40%;
                max-width: 40%;
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
                width: 60%;
                min-width: 60%;
                max-width: 60%;
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666666;
                justify-content: flex-end;
                .card-time{
                }
                .card-name{
                    color: #C6AA85;
                    font-weight: bold;
                }
            }
        }

    }
</style>