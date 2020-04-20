<template>
    <section class="page">
        <div class="activity-detail">
           <div class="activity-detail-pic">
               <img :src="paramsData.pic" alt="">
           </div>
           <div class="activity-detail-info">
               <div class="detail-info-item">
                   <div class="info-item-lable">活动名称</div>
                   <div class="info-item-desc">{{infoData.activityName}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动对象</div>
                   <div class="info-item-desc">{{infoData.activityTarget}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">报名时间</div>
                   <div class="info-item-desc">{{infoData.registerTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动时间</div>
                   <div class="info-item-desc">{{infoData.activeTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动地点</div>
                   <div class="info-item-desc">{{infoData.activePlace}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动费用</div>
                   <div class="info-item-desc">{{infoData.activeCost}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动名额</div>
                   <div class="info-item-desc">{{infoData.activeNum}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">已报名人数</div>
                   <div class="info-item-desc">{{infoData.registeNum}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动描述</div>
                   <div class="info-item-desc">{{infoData.activeDesc}}</div>
               </div>
           </div>
           <div class="detail-footer">
               <div class="ensure-btn">我要报名</div>
               <div class="cancle-btn">取消报名</div>
           </div>
        </div>
    </section>
</template>
<script>
export default {
  data(){
    return{
      paramsData:this.$route.params,
      infoData:{
        "activityName":"马拉松",
        "activityTarget":"全体员工",
        "registerTime":"2020-3-30 9:00:00-2020-3-31 18:00:00",
        "activeTime":"2020-4-1 9:00:00-2020-4-1 18:00:00",
        "activePlace":"上海市长宁区来福士",
        "activeCost":"免费",
        "activeNum":"不限",
        "registeNum":"40",
        "activeDesc":"为了响应全民健身的号召，加强员工身体素质，特别组织了马拉松活动，欢迎大家积极踊跃报名参加~",
      }
    }
  },
  created(){
    console.log("paramsData---==",this.paramsData)
  },

}
</script>
<style lang="less" scoped>
.page{
    font-size: 12px;
    padding: 0 10px;
    .activity-detail-pic{
        width: 100%;
        height:150px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .activity-detail-info{
        .detail-info-item{
            display: flex;
            padding: 10px 0;
            .info-item-lable{
                width: 20%;
            }
            .info-item-desc{
                width: 80%;
                color: #666;
            }
        }
    }
    .detail-footer{
        margin-top: 40px;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        font-size: 14px;
        .ensure-btn,.cancle-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            background: palevioletred;
            margin: 0 10px;
            border: 1px solid #a1526c;
            border-radius: 3px;
        }

    }
}
</style>