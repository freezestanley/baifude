<template>
    <div class="tab-wrap">
        <div class="tab-bar">
            <div
                    v-for="(item,index) in tabList"
                    :key="index"
                    class="tab-bar-item"
                    :class="[tabIndex == item.index ? 'tabs-active' : '']"
                    @click="changeTab(item)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="tab-content">
            <slot :name="active"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Nav',
    props:
        {
          tabList: Array,
          tabIndex: Number,
        },
    data() {
      return {
        comfrom:this.$route.query.comfrom,
        active: this.tabList[0].key,
      };
    },
    created(){
    },
    methods: {
      changeTab(item){
        this.active = item.key;
        this.$emit('changeTab', item);
      },
    },
  };
</script>

<style lang="less" scoped>
    .tab-wrap{
        .tab-bar{
            width: 100%;
            display: flex;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 5px;
            background-color: white;
            .tab-bar-item{
                width: 80px;
                height:40px;
                line-height: 40px;
                text-align: center;
                color: #333;
                cursor:pointer;
                margin-right: 15px;
                background-color: white;
                overflow: hidden;
            }
            .tabs-active{
                color: #4679A3;
                font-size: 16px;
            }
        }
        .tab-content{
        }
    }
</style>