<template>
    <section class="page">
        <div class="activity-detail">
           <div class="activity-detail-pic">
               <img :src="infoData.picture" alt="">
           </div>
           <div class="activity-detail-info">
               <div class="activity-detail-title">{{infoData.title}}</div>
               <!--<div class="detail-info-item">-->
                   <!--<div class="info-item-lable">活动名称</div>-->
                   <!--<div class="info-item-desc">{{infoData.title}}</div>-->
               <!--</div>-->
               <div class="detail-info-item">
                   <div class="info-item-lable">活动对象</div>
                   <div class="info-item-desc">{{infoData.scopeTypeName}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">报名时间</div>
                   <div class="info-item-desc">{{infoData.entryTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动时间</div>
                   <div class="info-item-desc">{{infoData.activityTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动地点</div>
                   <div class="info-item-desc">{{infoData.address}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动费用</div>
                   <div class="info-item-desc">{{infoData.cost}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动名额</div>
                   <div class="info-item-desc">{{infoData.activityQuota}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">已报名人数</div>
                   <div class="info-item-desc">{{infoData.attendNum}}</div>
               </div>
               <div class="">
                   <h4>活动描述</h4>
                   <div class="detail-html-style" v-html="infoData.content"></div>
               </div>
           </div>
            <div class="btn-wrap" @click="handle">
                <van-button :disabled="isdisabled" class="detail-footer">{{infoData.controlValue}}</van-button>
            </div>
            <!--<div v-if="infoData.remark" class="signRemark">{{infoData.remark}}</div>-->
        </div>
        <Fields ref="fields" @queryActivityDetail="activity_queryActivityDetail"></Fields>
    </section>
</template>
<script>
import {activity_entryCancel,activity_queryActivityDetail} from '@/assets/apis/home'
import Fields from './components/field'
import utilRes from "@/assets/utils/resResult";
import { Dialog } from 'vant';
export default {
  data(){
    return{
        id:this.$route.query.id,
        paramsData:this.$route.params,
        showPopup: false,
        infoData:{},//基本信息存储对象
        isdisabled:false,//按钮是否置灰
    }
  },
  created(){
    this.activity_queryActivityDetail();
    
  },
  methods:{
    gotoSignUp(){
        this.$refs.fields.showPopup = true;
    },
    cancelSignUp(){
        Dialog.confirm({
            title: '活动确认',
            message: '是否取消活动报名',
        })
        .then(() => {
           this.activity_entryCancel();
        })
        .catch(() => {
            // on cancel
        });
        
    },
    //查询活动详情
    async activity_queryActivityDetail() {
      let params={id:this.id}
      let res = await activity_queryActivityDetail(params);
      if (utilRes.successCheck(res)) {
        this.infoData = res.data;
        const {entryStatus} = res.data;
        if(entryStatus == ("CANNOT_ENTRY" || "QUOTE_FULL" || "OVER")){
          this.isdisabled=true;
        }

      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    //活动取消操作
    async activity_entryCancel() {
      let params={activityId:this.id}
      let res = await activity_entryCancel(params);
      if (utilRes.successCheck(res)) {
        this.activity_queryActivityDetail();
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    // parseType(type) {
    //   switch (type) {
    //     case 'CANNOT_ENTRY': return '无法报名';
    //     case 'TO_ENTRY': return '我要报名';
    //     case 'CANCEL_ENTRY': return '取消报名';
    //     case 'QUOTE_FULL': return '名额已满';
    //     case 'OVER': return '已结束';
    //   }
    // },
    handle(){
        if(this.infoData.entryStatus == 'TO_ENTRY'){
          this.gotoSignUp();
        }else if(this.infoData.entryStatus == 'CANCEL_ENTRY'){
          this.cancelSignUp();
        }
    },
  },
  components: {
      Fields
  }

}
</script>
<style lang="less" scoped>
.page{
    font-size: 15px;
    .activity-detail-pic{
        width: 100%;
        height:170px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .activity-detail-info{
        padding: 0 15px;
        .activity-detail-title{
            font-size: 19px;
            color: #000000;
            padding: 10px 0;
            font-weight: bold;
        }
        .detail-info-item{
            display: flex;
            padding: 10px 0;
            justify-content: space-between;
            .info-item-lable,.info-item-desc{
            overflow: hidden; /*溢出隐藏*/
            text-overflow: ellipsis; /*以省略号...显示*/
            white-space: nowrap; /*强制不换行*/}
            .info-item-lable{
                width: 25%;
                color: #85878C;
            }
            .info-item-desc{
                text-align: right;
                width: 73%;
                color: #232321;

            }
        }
    }
    .signRemark{
        text-align: center;
        color: red;
    }
    .btn-wrap{
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .detail-footer{
        margin-top: 25px;
        width: 90%;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background: #C6AA85;
        border-radius: 4px;
        text-align: center;
    }

    .wrapActivity{
        .title{
            margin: 0 10px;
            text-align: left;
            font-size: 23px;
            line-height: 51px;
            border-bottom: 1px solid black;
        }
        .formContanier{
            margin-top: 20px;
            background: #fff;
        }
    }
}
</style>

<style lang="less">
.wrapActivity{
    input::-webkit-input-placeholder {
       font-size: 12px;
    }
    // .frameInput{
    //     .van-field__body{
    //         border: 1px solid #999999;
    //         border-radius: 4px;
    //     }
    // }
    // input{
    //     padding-left: 5px;
    // }
    // .break_all{
    //     &.van-cell{
    //         display: block !important;
    //     }
    //     .van-field__label{
    //         width: auto;
    //     } 
    // }
    // .van-image__img{
    //     display: block;
    //     width: 56px;
    //     height: 56px;
    // }
    // .margin_bt7{
    //     margin-bottom: 7px;
    // }
    
    
}
</style>