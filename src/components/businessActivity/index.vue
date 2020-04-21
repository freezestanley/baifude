<template>
    <section class="business-activity">
        <div class="item">
            <div class="pic"></div>
            <div class="text">
                <div>瑜伽学习</div>
                <div>2020.04-2020.06</div>
            </div>
            <div class="btn">
                报名中
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less" scoped>
.business-activity{
    font-size: 12px;
    .item{
        width: 120px;
        height: auto;
        .pic{
            width: 120px;
            height:70px;
            background: hotpink;
        }
        .btn{
            width: 60px;
            height: 30px;
        }
    }
}
</style>