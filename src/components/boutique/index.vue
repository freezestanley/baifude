<template>
    <section class="boutique">
        <div class="boutique-wrap" v-if="data.length == 1">
            <div class="boutique-item" v-for="(item,index) in data" :key="index">
                <img :src="item.pic" alt="">
            </div>
        </div>
        <div v-else-if="data.length == 2">
            <div></div>
        </div>
        <div v-else-if="data.length == 3">
            <div></div>
        </div>
        <div v-else>
            <div></div>
        </div>
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
  }
</script>

<style lang="less" scoped>
.boutique-wrap{
    padding: 10px 0 0 0;
    .boutique-item{
        width: 100%;
        height:150px;
        background: pink;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}

</style>