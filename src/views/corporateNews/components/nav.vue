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
            font-size: 16px;
            .tab-bar-item{
                width: 80px;
                height:40px;
                line-height: 40px;
                text-align: center;
                color: #333;
                cursor:pointer;
                margin-left: 15px;
            }
            .tabs-active{
                color: #05ab17;
                font-size: 18px;
            }
        }
        .tab-content{
        }
    }
</style>