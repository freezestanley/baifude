<template>
  <div v-if="showPopup"  class="fillPopup">
    <div class="wrapActivity">
      <div class="formContanier">
        <div>
          <div @click="closeSignUp" class="title">
            <img style="vertical-align: middle;" src="../../../../../src/assets/images/elegance/arrow_left.png" alt="">
            <span>填写报名信息</span>
          </div>
        </div>
        <van-form v-if="activityData.controlList.length>0"  @submit="onSubmit" :show-error="false">
          <div class="wrapInput borderStyle" style="margin:0 0.4rem"  v-for="(item,index) in activityData.controlList" :key="index">
            <van-field class="inputStyle" v-if="item.optionsType==3 && item.optionsName=='姓名'"
                       v-model="item.optionsValue"
                       label="姓名"
                       placeholder="请输入姓名"
                       />
              <van-field class="inputStyle" v-if="item.optionsType==3 && item.optionsName=='手机号'"
                         v-model="item.optionsValue"
                         label="手机号"
                         placeholder="请输入手机号码"
                         />
                <van-field class="inputStyle" v-if="item.optionsType==3 && item.optionsName!='手机号' && item.optionsName!='姓名'"
                           v-model="item.optionsValue"
                           :label="item.optionsName"
                           :placeholder="'请输入'+item.optionsName"

                           />
                  <template v-if="item.optionsType==4">
                    <van-field
                            readonly
                            clickable
                            name="calendar"
                            :value="item.optionsValue"
                            :label="item.optionsName"
                            placeholder="请选择日期"
                            @click="findDate(item)"
                            />
                      <van-calendar :min-date="new Date('1900/01/01')" :max-date="new Date('2030/01/01')" v-model="showCalendar" @confirm="onConfirm" />
                  </template>
                  <van-field class="frameCheckBox" v-if="item.optionsType==1" name="radio" :label="item.optionsName+''">
                    <template #input>
                      <van-radio-group v-model="item.optionsValue" direction="horizontal">
                        <van-radio :name="key" v-for="(value, key, index) in item.applyOptionMap" :key="index">{{key}}</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                  <van-field
                                               v-if="item.optionsType==2"
                                               name="checkboxGroup" :label="item.optionsName" >
                                               <template #input>
                                                 <van-checkbox-group  v-model="item.optionsValue" >
                                                   <van-checkbox v-for="(value, key, index) in item.applyOptionMap" class="margin_bt7" :name="key" :key="index" shape="square">{{key}}</van-checkbox>
                                                 </van-checkbox-group>
                                               </template>
                  </van-field>

                  <!-- <van-field v-if="item.optionsType==5" class="uploadImg" name="uploader" :label="item.optionsName" readonly>
                    <template #input>
                    <van-image :src="item.optionsValue" />
                    </template>
                    </van-field> -->
                    <van-field  class="uploadImg" v-if="item.optionsType==5" name="uploader" :label="item.optionsName">
                      <template #input  v-if="item.optionsValue">
                        <div class="img_container">
                          <van-image :src="item.optionsValue" />
                            <img @click="cancelUpload(item)" class="img_close" src="../../../../../src/assets/images/elegance/img_close.png">
                        </div>
                      </template>
                      <template #input v-else>
                        <div @click="uploadItem(index)">
                          <van-uploader :after-read="afteRead">
                            <!-- <van-button icon="photo" type="primary" >上传</van-button> -->
                            <!-- <div></div> -->
                          </van-uploader>
                        </div>
                        <!-- <van-button icon="photo" type="primary" @click="uploadMethod">上传</van-button> -->
                      </template>
                          </van-field>
          </div>
          <div class="detail-footer">
            <div class="ensure-btn" @click="gotoSignUp">立即报名</div>
            <!-- <div class="cancle-btn" @click="closeSignUp">关闭</div> -->
          </div>
                    </van-form>
                    <!-- <input type="file" ref="uploadInput" multiple style="display:none"  @change="changeInput"> -->
      </div>
    </div>
  </div>    
</template>
<script>
import {activity_queryActivityForm,activity_activityEntry,activity_uploadFile} from '@/assets/apis/home'
import utilRes from "@/assets/utils/resResult";
import Toast from "@/components/toast/toast"
export default {
  components: {
    Toast
  },
  data(){
    return{
      activityId:this.$route.query.id, //活动id
      dateItem:"", //保存选择时间的对象
      uploadImageItemIndex:"", //保存图片上传的对象
      showPopup: false,
      showCalendar: false,
      activityData:{
        controlList: [
          // {
          //     "activityOptionsId": 1,
          //     "optionsName": "姓名",
          //     "optionsType": 3,
          //     "optionsValue":""
          // },
          // {
          //     "activityOptionsId": 2,
          //     "optionsName": "手机号",
          //     "optionsType": 3,
          //     "optionsValue":""
          // },
          // {
          //     "activityOptionsId": 3,
          //     "applyOptionMap": {
          //         "男": "男",
          //         "女": "女"
          //     },
          //     "optionsName": "性别",
          //     "optionsType": 1,
          //     "optionsValue":""
          // },
          // {
          //     "activityOptionsId": 4,
          //     "applyOptionMap": {
          //         "汽车": "汽车",
          //         "轮船": "轮船",
          //         "飞机": "飞机",
          //         "火车": "火车",
          //         "坦克":"坦克",
          //         "飞机1": "飞机1",
          //         "火车1": "火车1",
          //         "坦克1":"坦克1",
          //         "飞机1": "飞机1",
          //         "火车1": "火车1",
          //         "坦克1":"坦克1"
          //     },
          //     "optionsName": "方式",
          //     "optionsType": 2,
          //     "optionsValue":[]
          // },
          // {
          //     "activityOptionsId": 4,
          //     "applyOptionMap": {
          //     },
          //     "optionsName": "日期",
          //     "optionsType": 4,
          //     "optionsValue":""
          // },
          // {
          //     "activityOptionsId": 5,
          //     "applyOptionMap": {
          //     },
          //     "optionsName": "一寸照片",
          //     "optionsType": 5,
          //     "optionsValue":"http://devimg.dongfangfuli.com/2020/01/22/c55fe89912fc17c8dde8111a3474ecbeeae2d0377c20e0cfd05493fac02a9cff.jpg"
          // },
          // {
          //     "activityOptionsId": 6,
          //     "applyOptionMap": {
          //     },
          //     "optionsName": "上传照片",
          //     "optionsType": 6,
          //     "optionsValue":""
          // }
        ]
      },

    }
  },
  created(){
    //查询活动表单
    this.activity_queryActivityForm();
  },
  methods:{
    afteRead(file){
      const fileContent = file.file;
      //首先判断是否是图片
      if(!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|BMP)$/.test(fileContent.type)){
        Toast.show({
          content: '请上传JPG、BMP、PNG、GIF格式图片',
          isSuccess: false,
          duration: 1000
        });
        return false;
      }
      if(fileContent.size>200*1024){
        Toast.show({
          content: '上传图片大于200K,请重新上传',
          isSuccess: false,
          duration: 1000
        });
        return false;
      }
      const formData = new FormData();
      formData.append("file", fileContent);
      this.activity_uploadFile(formData);
    },
    // bae64转文件对象
    dataURLtoFile (dataurl, filename) {
      // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      var arr = dataurl.split(","); var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    uploadMethod(){
      this.$refs.uploadInput.click();
    },
    // changeInput(e){
    //   let $target = e.target || e.srcElement
    //   let file = $target.files[0]
    //   if (!file) {
    //     return
    //   }
    //   let formData = new FormData();
    //   formData.append('file', file);
    //   console.log(file);
    //   this.activity_uploadFile(formData);

    // },
    cancelUpload(item){
      item.optionsValue = "";
    },
    uploadItem(index){
      this.uploadImageItemIndex = index;
    },
    onSubmit(){
      // console.log(this.activityData);
    },
    findDate(item){
      this.showCalendar = true;
      this.dateItem = item;
    },
    validator(val) {
      return true;
    },
    gotoSignUp(){
      let params = JSON.parse(JSON.stringify(this.activityData));
      this.activity_activityEntry(params);

    },
    closeSignUp(){
      this.showPopup = false;
    },
    onConfirm(date){
      this.dateItem.optionsValue = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    convertBase64UrlToBlob(urlData) {
      var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: 'image/png'
      });
    },


    //查询活动表单
    async activity_queryActivityForm(){
      let params={activityId:this.activityId};
      let res = await activity_queryActivityForm(params);
      if(utilRes.successCheck(res)){
        this.activityData = res.data;
        this.activityData.controlList.forEach((item,index)=>{
          if(item.optionsType==2){
            item.optionsValue = []; 
          }
        })
      }else{
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    //活动报名提交
    async activity_activityEntry(params){
      params.controlList.map((item)=>{
        if(item.optionsType==2 && Array.isArray(item.optionsValue)){
          return item.optionsValue = item.optionsValue.join(',');
        }
      })

      let valid = true;
      //校验
      params.controlList.forEach((item,index) => {
        if(!valid){
          return
        }
        if((item.optionsType==1||item.optionsType==2||item.optionsType==4)&&!item.optionsValue){
          valid = false;
          Toast.show({
            content: '请选择'+item.optionsName,
            isSuccess: false,
            duration: 1000
          });
        }else if(item.optionsType==3 && !item.optionsValue){
          valid = false;
          Toast.show({
            content: '请填写'+item.optionsName,
            isSuccess: false,
            duration: 1000
          });
        }else if(item.optionsType==5 && !item.optionsValue){
          valid = false;
          Toast.show({
            content: '请上传'+item.optionsName,
            isSuccess: false,
            duration: 1000
          });
        }else if(item.optionsType==3 && item.optionsName=="手机号" && !/^1[0-9]{10}$/.test(item.optionsValue)){
          valid = false;
          Toast.show({
            content: '请填写正确格式的手机号',
            isSuccess: false,
            duration: 1000
          });
        }
      });

      if(!valid){
        return
      }
      let res = await activity_activityEntry(params);
      if(utilRes.successCheck(res)){
        this.$emit('queryActivityDetail');
        Toast.show({
          content: '报名成功',
          isSuccess: false,
          duration: 2000
        });
        this.showPopup = false;
      }else{
        Toast.show({
          content: '调用接口失败',
          isSuccess: false,
          duration: 1000
        });
      }
    },
    //文件提交
    async activity_uploadFile(params){
      let res = await activity_uploadFile(params);
      if(utilRes.successCheck(res)){
        // this.$set(this.activityData[this.uploadImageItemIndex],'optionsValue',res.data.url);
        this.activityData.controlList[this.uploadImageItemIndex].optionsValue = res.data.url
        // console.log(this.activityData.controlList);
        // this.uploadImageItem.optionsValue = res.data.url;
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
@rem: 75rem;
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
    margin: 88/@rem 0 88/@rem 0;
    width: 100%;
    height: 88px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    .ensure-btn,.cancle-btn{
      width: 690/@rem;
      height: 88/@rem;
      border-radius:8/@rem;
      line-height: 88/@rem;
      text-align: center;
      color: #fff;
      background:rgba(198,170,133,1);
      border-radius: 3px;
    }

  }

  .wrapActivity{
    .title{
      // margin: 0 10px;
      text-align: center;
      line-height: 88/@rem;
      border-bottom: 1px solid black;
      font-size:32/@rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      border-bottom: 1px solid #E0E6ED;
      position: relative;
      img{
        position: absolute;
        left: 11px;
        top: 13px; 
      }
    }
    .formContanier{
      height: 100%;
      background: #fff;
    }
    .uploadImg{
      display: block !important;
      .img_container{
        position: relative;
        .img_close{
          width:40/@rem;
          height:40/@rem;
          background:rgba(35,35,33,1);
          opacity:0.8;
          border-radius:20/@rem;
          position: absolute;
          right: -9px;
          top: -9px;
        }
      }
    }
  }
  .wrapInput{
    border-bottom: 1px solid #E0E6ED;
    
    &:last-child{
      border-bottom: 0 solid #fff !important;
    }
    &:last-of-type{
      border-bottom: 0 solid #fff !important;
    }
  }
  .borderStyle:last-child{
    border-bottom: #fff !important;
  }
  .fillPopup{
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    z-index: 20000;
    overflow-y:scroll;
    overflow-x:hidden;

  }
}
</style>

<style lang="less">
@rem: 75rem;
.wrapActivity{
  input::-webkit-input-placeholder {
    font-size:30/@rem !important;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(213,216,219,1);
  }
  .frameCheckBox{
    .van-field__value{
      text-align: left;
      margin: 0 0 0 3px;
      .van-field__body{
        display: inline-block;

      }
    }

  }
  .van-checkbox-group{
    // display: flex;
    // flex-wrap: wrap;
    width: 100%;
    margin: 20px 0 0 0;

  }
  input{
    padding-left: 5px;
  }
  .van-field{
    &.van-cell{
      line-height: 112/@rem;
      padding: 0 !important;
      .van-field__label{
        width: 128/@rem !important;
        font-size:30/@rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(133,135,140,1);
        margin-right: 56/@rem;
        span{
          display: block;
          text-align: justify;
          text-justify: distribute-all-lines;
          text-align-last: justify;
        }
      }
    }
    // .van-field__label{
      //     width: auto;
    // } 
  }
  .van-image__img{
    display: block;
    width: 160/@rem;
    height: 160/@rem;
  }
  .margin_bt7{
    margin-bottom: 7px;
    margin-left: 5px;
  }
  .van-calendar__selected-day{
    background-color: #C6AA85 !important;
  }
  .van-button--danger{
    background-color: #C6AA85;
    border: 0.026667rem solid #C6AA85;
  }
  .wrapInput{
    .inputStyle{
      .van-cell__value{
        text-align: left;
        .van-field__body{
          display: inline-block;
          .van-field__control{
            line-height: 26px !important;
            height: 26px;
          }
        }
      }
    }
  }


}
</style>
