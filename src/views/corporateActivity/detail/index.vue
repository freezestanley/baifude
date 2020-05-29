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
                   <div class="info-item-lable">报名时间</div>
                   <div class="info-item-desc">{{infoData.entryTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动时间</div>
                   <div class="info-item-desc">{{infoData.activityTime}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动地点</div>
                   <div class="info-item-desc" v-if="infoData.activityType">{{infoData.activityType == 1?"线上活动，无活动地点":infoData.address}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动费用</div>
                   <div class="info-item-desc">{{infoData.cost}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动对象</div>
                   <div class="info-item-desc">{{infoData.scopeTypeName}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">活动名额</div>
                   <div class="info-item-desc">{{infoData.activityQuota}}</div>
               </div>
               <div class="detail-info-item">
                   <div class="info-item-lable">已报名人数</div>
                   <div class="info-item-desc">{{infoData.attendNum}}人</div>
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
import {activity_entryCancel,activity_queryActivityDetail,activity_queryActivityForm,activity_activityEntry} from '@/assets/apis/home'
import Fields from './components/field'
import utilRes from "@/assets/utils/resResult";
import { Dialog } from 'vant';
import Toast from "@/components/toast/toast"
export default {
  data(){
    return{
        id:this.$route.query.id,
        paramsData:this.$route.params,
        showPopup: false,
        infoData:{},//基本信息存储对象
        isdisabled:false,//按钮是否置灰
        activityData:{}
    }
  },
  created(){
    this.activity_queryActivityDetail();
    
  },
  methods:{
    async gotoSignUp(){
        await this.activity_queryActivityForm();
        //有报名条件弹窗填写，没有报名条件直接报名成功
        //console.log('this.activityData.controlList',this.activityData);
        if(this.activityData.controlList && this.activityData.controlList.length>0){
            this.$refs.fields.showPopup = true;
        }else{
            this.activity_activityEntry();
        }
        
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
        if(entryStatus == "CANNOT_ENTRY" || entryStatus == "QUOTE_FULL" || entryStatus == "OVER"){
          this.isdisabled=true;
        }

      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    //活动报名提交
    async activity_activityEntry(){
      let params={activityId:this.id,controlList:[]};
      let res = await activity_activityEntry(params);
      // console.log('报名成功',res);
      if(utilRes.successCheck(res)){
        this.activity_queryActivityDetail();
        Toast.show({
          content: '报名成功',
          isSuccess: false,
          duration: 2000
        });
        this.showPopup = false;
      }else{
        Toast.show({
          content: res.data.errMsg ? res.data.errMsg : "调用接口失败!",
          isSuccess: false,
          duration: 1000
        });
      }
    },
    //活动取消操作
    async activity_entryCancel() {
      let params={activityId:this.id}
      let res = await activity_entryCancel(params);
      if (utilRes.successCheck(res)) {
        this.activity_queryActivityDetail();
        Toast.show({
            content: '取消报名成功',
            isSuccess: false,
            duration: 1000
        });
      } else {
        Toast.show({
            content: '取消报名失败',
            isSuccess: false,
            duration: 1000
        });
      }
    },
    //查询活动表单
    async activity_queryActivityForm(){
      let params={activityId:this.id};
      let res = await activity_queryActivityForm(params);
      if(utilRes.successCheck(res)){
        this.activityData = res.data;
        this.activityData.controlList = this.activityData.controlList?this.activityData.controlList:[];
      }else{
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
    padding-top: 20px;
    font-size: 15px;
    .activity-detail{
        margin-top: 26px;
    }
    .activity-detail-pic{
        width: 100%;
        height:210px;
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
            padding: 8px 0;
            justify-content: space-between;
            .info-item-lable{
                width: 25%;
                color: #85878C;
            }
            .info-item-desc{
                /*text-align: right;*/
                max-width: 70%;
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
        width: 345px;
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
.detail-html-style{
    overflow: hidden;
    img{
        width: 100% !important;
        height:100% !important;
        display: block;
    }
    *{
        font-size: 13px;
        color:#333333;
        font-family: -apple-system-font, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    }
}
</style>