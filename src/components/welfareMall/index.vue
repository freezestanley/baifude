<template>
  <div>
    <div class="welfare_wrap">
      <a  :href="item.h5Url" v-for="(item,index) in welfareMallDataList" :key="index">
        <div class="welfare_info" :class="`welfare_info_${item.code}`">
          <div class="welfare">
          </div>
          <div class="welfare_title">{{item.name}}</div>
        </div>
      </a>
    </div>
    <div class="footer">
      <div class="section-last-tip">
          <div class="section-last-text">已经到底啦</div>
      </div>
    </div>
  </div>
</template>
<script>
// import imgIco from '@/ass'
export default {
  data(){
    return {}
  },
  props:{
    welfareMallDataList: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  created(){
    console.log(this.welfareMallDataList);
  }
}
</script>
<style lang="less" scoped>
@rem: 75rem;
.welfare_wrap{
  // margin: 0.3rem 0.3rem 0 0.3rem;
  display: flex;
  flex-wrap: wrap;    
  text-align: center;
  a{
    margin: 13px 0 0 13px;
  }
  .welfare_info{
    width: 333/@rem;
    height: 200/@rem;
    border-radius: 10/@rem;
    background: url('../../assets/images/welfareMall/other2.png') no-repeat center;
    background-size: contain;
    overflow: hidden;
    &.welfare_info_Travel{
      background: url('../../assets/images/welfareMall/travel.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/travelIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Packages{
      background: url('../../assets/images/welfareMall/packages.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/packagesIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Movies{
      background: url('../../assets/images/welfareMall/movies.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/moviesIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Shows{
      background: url('../../assets/images/welfareMall/shows.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/showsIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Birthday{
      background: url('../../assets/images/welfareMall/birthday.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/birthdayIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Shopping{
      background: url('../../assets/images/welfareMall/shopping.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/shoppingIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_Health{
      background: url('../../assets/images/welfareMall/health.png') no-repeat center;
      background-size: contain;
      .welfare{
        background: url('../../assets/images/welfareMall/healthIcon.png') no-repeat center;
        background-size: contain;
      }
    }
    &.welfare_info_2123{
      background: url('../../assets/images/welfareMall/other1.png') no-repeat center;
      background-size: contain;
    }
    &.welfare_info_2124{
      background: url('../../assets/images/welfareMall/other2.png') no-repeat center;
      background-size: contain;
    }
    .welfare{
      height: 60/@rem;
      width: 60/@rem;
      display: block;
      margin: 25px auto 10px auto;
      background: url('../../assets/images/welfareMall/otherIcon.png') no-repeat center;
      background-size: contain;
    }
    .welfare_title{
      margin: 0 auto;
      font-size: 12px;
      line-height: 17px;
      height: 17px;
      color: #ffffff;
    }
  }
}
.footer{
  .section-last-tip{
    margin: 30px auto;
    width: 199px;
    border-bottom: 1px solid #E5E5E5;
    position: relative;
    font-size: 12px;
    .section-last-text{
        position:absolute;
        left:50%;
        top:50%;
        margin-top:-9px;
        margin-left: -40px;
        height: 18px;
        width: 79px;
        background: #fff;
        color:#B2B2B2;
        text-align: center;
    }
  }
}
</style>