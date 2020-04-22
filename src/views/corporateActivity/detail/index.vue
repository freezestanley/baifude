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
               <div class="ensure-btn" @click="gotoSignUp">我要报名</div>
               <div class="cancle-btn">取消报名</div>
           </div>
        </div>
        <van-popup v-model="showPopup" position="bottom" >
            <div class="wrapActivity">
                <div class="title">填写报名信息</div>
                <div class="formContanier">
                    <van-form @submit="onSubmit" :show-error="false">
                        <van-field
                            v-model="activityData.username"
                            label="姓名:"
                            placeholder="请输入姓名"
                            :rules="[{ required: true, message: '请输入姓名' },{ validator, message: '请输入正确内容' }]"
                            class="frameInput"
                        />
                        <van-field
                            v-model="activityData.phone"
                            label="手机号码:"
                            placeholder="请输入手机号码"
                            :rules="[{ required: true, message: '请输入手机号码' }]"
                            class="frameInput"
                        />
                        <van-field
                            v-model="activityData.age"
                            label="年龄:"
                            placeholder="请输入年龄"
                            :rules="[{ required: true, message: '请输入年龄' }]"
                            class="frameInput"
                        />
                        <van-field
                            v-model="activityData.number"
                            label="参与人数:"
                            placeholder="请输入参与人数"
                            :rules="[{ required: true, message: '请输入参与人数' }]"
                            class="frameInput"
                        />
                        <van-field
                            readonly
                            clickable
                            name="calendar"
                            :value="activityData.date"
                            label="出生日期:"
                            placeholder="yyyy/mm/dd"
                            @click="showCalendar = true"
                            :rules="[{ required: true, message: '请选择出生日期' }]"
                            class="frameInput"
                        />
                        <van-calendar :max-date="new Date('2030/01/01')" v-model="showCalendar" @confirm="onConfirm" />
                        <van-field name="radio" label="性别">
                            <template #input>
                                <van-radio-group v-model="activityData.gender" direction="horizontal">
                                <van-radio name="1">男</van-radio>
                                <van-radio name="2">女</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                        <van-field name="checkboxGroup" label="参与环节:" :rules="[{ required: true, message: '请选择内容' }]">
                            <template #input>
                                <van-checkbox-group  v-model="activityData.checkBackTracking" >
                                <van-checkbox class="margin_bt7" name="1" shape="square">飞机</van-checkbox>
                                <van-checkbox class="margin_bt7" name="2" shape="square">火车</van-checkbox>
                                <van-checkbox class="margin_bt7" name="3" shape="square">自驾</van-checkbox>
                                <van-checkbox class="margin_bt7" name="4" shape="square">大巴</van-checkbox>
                                </van-checkbox-group>
                            </template>
                        </van-field>
                        <van-field name="uploader" label="一寸照片:">
                            <template #input>
                                <van-uploader>
                                    <van-button icon="photo" type="primary">上传</van-button>
                                </van-uploader>
                            </template>
                        </van-field>
                        <van-field name="uploader" label="一寸照片:" readonly>
                            <template #input>
                                <van-image src="http://devimg.dongfangfuli.com/2020/01/22/c55fe89912fc17c8dde8111a3474ecbeeae2d0377c20e0cfd05493fac02a9cff.jpg" />
                            </template>
                        </van-field>
                        <div class="detail-footer">
                            <div class="ensure-btn" @click="gotoSignUp">报名</div>
                            <div class="cancle-btn" @click="closeSignUp">关闭</div>
                        </div>
                    </van-form>
                </div>
            </div>
        </van-popup>
    </section>
</template>
<script>
import {queryActivityList,activity_queryActivityDetail} from '@/assets/apis/home'
export default {
  data(){
    return{
        paramsData:this.$route.params,
        showPopup: false,
        showCalendar: false,
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
        },
        activityData:{
            username:"", //您的姓名
            phone:"", //手机号
            age:"",  
            personNum:"", //参与人数
            date:"", //出生日期
            checkBackTracking:[],
            gender:"" //性别
        }
    }
  },
  created(){
    let params = {userId:321};
    this.queryActivityListMethod(params);
  },
  methods:{
    onSubmit(){
        console.log(this.activityData);
    },
    validator(val) {
        return /1/.test(val);
    },
    gotoSignUp(){
        this.showPopup = true;
    },
    closeSignUp(){
        this.showPopup = false;
    },
    onConfirm(date){
        this.activityData.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        this.showCalendar = false;
    },
    async queryActivityListMethod(params){
        let res = await queryActivityList(params);
    },
    async activity_queryActivityDetail() {
      let params={currentPage:1,itemsPerPage:10}
      let res = await activity_queryActivityDetail(params);
      if (utilRes.successCheck(res)) {
        this.list = res.data.listObj;
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    }
  }

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
        }
    }
}
</style>

<style lang="less">
.wrapActivity{
    input::-webkit-input-placeholder {
       font-size: 12px;
    }
    .frameInput{
        .van-field__body{
            border: 1px solid #999999;
            border-radius: 4px;
        }
    }
    input{
        padding-left: 5px;
    }
    .break_all{
        &.van-cell{
            display: block !important;
        }
        .van-field__label{
            width: auto;
        } 
    }
    .van-image__img{
        display: block;
        width: 56px;
        height: 56px;
    }
    .margin_bt7{
        margin-bottom: 7px;
    }
    
    
}
</style>