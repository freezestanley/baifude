<template>
    <van-popup v-model="showPopup" position="bottom" >
        <div class="wrapActivity">
            <div class="formContanier">
                <div class="title">填写报名信息</div>
                <van-form v-if="activityData.controlList.length>0"  @submit="onSubmit" :show-error="false">
                    <div  v-for="(item,index) in activityData.controlList" :key="index">
                        <van-field v-if="item.optionsType==3 && item.optionsName=='姓名'"
                            v-model="activityData.username"
                            label="姓名:"
                            placeholder="请输入姓名"
                            :rules="[{ required: true, message: '请输入姓名' },{ validator, message: '请输入正确内容' }]"
                            class="frameInput"
                        />
                        <van-field v-if="item.optionsType==3 && item.optionsName=='手机号'"
                            v-model="activityData.phone"
                            label="手机号码:"
                            placeholder="请输入手机号码"
                            :rules="[{ required: true, message: '请输入手机号码' }]"
                            class="frameInput"
                        />
                        <van-field v-if="item.optionsType==3 && item.optionsName!='手机号' && item.optionsName!='姓名'"
                            v-model="activityData.age"
                            :label="item.optionsName+':'"
                            :placeholder="'请输入'+item.optionsName"
                            :rules="[{ required: true, message: '请输入'+item.optionsName }]"
                            class="frameInput"
                        />
                        <template v-if="item.optionsType==4">
                            <van-field
                                readonly
                                clickable
                                name="calendar"
                                :value="activityData.date"
                                :label="item.optionsName+':'"
                                placeholder="yyyy/mm/dd"
                                @click="showCalendar = true"
                                :rules="[{ required: true, message: '请选择出生日期' }]"
                                class="frameInput"
                            />
                            <van-calendar :max-date="new Date('2030/01/01')" v-model="showCalendar" @confirm="onConfirm(item)" />
                        </template>
                        <van-field v-if="item.optionsType==1" name="radio" :label="item.optionsName+''">
                            <template #input>
                                <van-radio-group v-model="item.optionsValue" direction="horizontal">
                                    <van-radio :name="key" v-for="(value, key, index) in item.applyOptionMap" :key="index">{{value}}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                        <van-field
                         v-if="item.optionsType==2"
                         name="checkboxGroup" :label="item.optionsName+':'" :rules="[{ required: true, message: '请选择内容' }]">
                            <template #input>
                                <van-checkbox-group  v-model="activityData.checkBackTracking" >
                                    <van-checkbox v-for="(value, key, index) in item.applyOptionMap" class="margin_bt7" :name="key" :key="index" shape="square">{{value}}</van-checkbox>
                                </van-checkbox-group>
                            </template>
                        </van-field>
                        
                        <van-field v-if="item.optionsType==5" name="uploader" :label="item.optionsName+':'" readonly>
                            <template #input>
                                <van-image :src="item.optionsValue" />
                            </template>
                        </van-field>
                        <van-field v-if="item.optionsType==6" name="uploader" :label="item.optionsName+':'">
                            <template #input>
                                <van-uploader>
                                    <van-button icon="photo" type="primary">上传</van-button>
                                </van-uploader>
                            </template>
                        </van-field>
                    </div>
                    <div class="detail-footer">
                        <div class="ensure-btn" @click="gotoSignUp">报名</div>
                        <div class="cancle-btn" @click="closeSignUp">关闭</div>
                    </div>
                </van-form>
            </div>
        </div>
    </van-popup>    
</template>
<script>
import {queryActivityList,activity_queryActivityForm} from '@/assets/apis/home'
import utilRes from "@/assets/utils/resResult";
export default {
  data(){
    return{
        showPopup: false,
        showCalendar: false,
        activityData:{
            controlList: [
                {
                    "activityOptionsId": 1,
                    "optionsName": "姓名",
                    "optionsType": 3,
                    "optionsValue":""
                },
                {
                    "activityOptionsId": 2,
                    "optionsName": "手机号",
                    "optionsType": 3,
                    "optionsValue":""
                },
                {
                    "activityOptionsId": 3,
                    "applyOptionMap": {
                        "0": "男",
                        "1": "女"
                    },
                    "optionsName": "性别",
                    "optionsType": 1,
                    "optionsValue":""
                },
                {
                    "activityOptionsId": 4,
                    "applyOptionMap": {
                        "0": "汽车",
                        "1": "轮船",
                        "2": "飞机",
                        "3": "火车"
                    },
                    "optionsName": "方式",
                    "optionsType": 2,
                    "optionsValue":""
                },
                {
                    "activityOptionsId": 4,
                    "applyOptionMap": {
                    },
                    "optionsName": "日期",
                    "optionsType": 4,
                    "optionsValue":""
                },
                {
                    "activityOptionsId": 5,
                    "applyOptionMap": {
                    },
                    "optionsName": "一寸照片",
                    "optionsType": 5,
                    "optionsValue":"http://devimg.dongfangfuli.com/2020/01/22/c55fe89912fc17c8dde8111a3474ecbeeae2d0377c20e0cfd05493fac02a9cff.jpg"
                },
                {
                    "activityOptionsId": 6,
                    "applyOptionMap": {
                    },
                    "optionsName": "上传照片",
                    "optionsType": 6,
                    "optionsValue":""
                }
            ]
        },
    
    }
  },
  created(){
    let params = {userId:321};
    
    //查询活动表单
    this.activity_queryActivityForm();
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
    //查询活动表单
    async activity_queryActivityForm(){
        let params={};
        let res = await activity_queryActivityForm(params);
        if(utilRes.successCheck(res)){
            this.activityData = res.data;
        }else{
            this.$message({
                type: "error",
                message: res.errMsg ? res.errMsg : "调用接口失败!"
            });
        }
    },
    //活动报名提交
    async activity_activityEntry(){
        let params={};
        let res = await activity_activityEntry(params);
        if(utilRes.successCheck(res)){
            this.activityData = res.data;
        }else{
            this.$message({
                type: "error",
                message: res.errMsg ? res.errMsg : "调用接口失败!"
            });
        }
    }
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