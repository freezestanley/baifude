<template>
  <div>
    <!-- <div v-for="(item, index) in questionList" :key="index" class="s">
      {{ item.title }}
    </div> -->
    <!-- <component v-if="item.type" :key="item.id" :is="item.slug" :node="item" /> -->
    <div class="wrapActivity">
      <div class="formContanier">
        <van-form
          ref="vanForm"
          v-if="questionList.length > 0"
          @submit="onSubmit"
          :show-error="false"
        >
          <div
            class="wrapInput borderStyle"
            v-for="(item, index) in questionList"
            :key="index"
          >
            <div class="wrap-header">
              <div class="wrap-header__l">*{{ PrefixZero(index + 1, 2) }}</div>
              <div class="wrap-header__r">{{ item.title }}</div>
            </div>
            <van-field
              v-if="item.type === 3"
              v-model="item.optionsValue"
              rows="1"
              :autosize="{ maxHeight: 100, minHeight: 30 }"
              type="textarea"
              maxlength="100"
              :placeholder="'请输入'+item.title"
              show-word-limit
              :disabled="staffParticipateStatus==1"
            />
            <van-field
              v-if="item.type === 4"
              v-model="item.optionsValue"
              :placeholder="'请输入'+item.title"
              :disabled="staffParticipateStatus==1"
            />

            <van-field class="frameCheckBox" v-if="item.type == 1" name="radio">
              <template #input>
                <van-radio-group v-model="item.optionsValue">
                  <van-radio
                    v-for="(value, key, index) in item.options"
                    :name="value.id"
                    :key="index"
                    :disabled="staffParticipateStatus==1"
                    >{{ value.optionValue }}</van-radio
                  >
                </van-radio-group>
              </template>
            </van-field>

            <van-field v-if="item.type == 2" name="checkboxGroup">
              <template #input>
                <van-checkbox-group v-model="item.optionsValue">
                  <van-checkbox
                    v-for="(value, key, index) in item.options"
                    class="margin_bt7"
                    :name="value.id"
                    :key="index"
                    shape="square"
                    :disabled="staffParticipateStatus==1"
                    >{{ value.optionValue }}</van-checkbox
                  >
                </van-checkbox-group>
              </template>
            </van-field>
          </div>
          <div class="detail-footer">
            <div v-if="startStatus" class="ensure-btn dis-btn">
              {{ startTime }} 开始
            </div>
            <div v-else> 
              <div v-if="staffParticipateStatus==1" class="cancle-btn participated">已参与</div>
              <div v-else class="ensure-btn" @click="gotoSignUp">提 交</div>
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "customFrom",
  props: ["questionList", "startTime","staffParticipateStatus"],
  data() {
    return {};
  },
  computed: {
    startStatus() {
      return (
        this.startTime &&
        new Date(this.startTime.replace(/-/g, "/")) - new Date() > 0
      );
    }
  },
  methods: {
    onSubmit() {},
    gotoSignUp() {
      //console.log('this.questionList->调研',this.questionList);
      let contents = "";
      for(var i=0; i < this.questionList.length; i++){
        if(this.questionList[i].type==1 && !this.questionList[i].optionsValue){
          contents = "请选择"+this.questionList[i].title;
          Toast(contents);
          return;
        }else if(this.questionList[i].type==2 && !this.questionList[i].optionsValue.length){
          contents = "请选择"+this.questionList[i].title;
          Toast(contents);
          return;
        }else if((this.questionList[i].type==3||this.questionList[i].type==4) && !this.questionList[i].optionsValue){
          contents = "请输入"+this.questionList[i].title;
          Toast(contents);
          return;
        }
      }
      
      
      this.$emit("onSubmit", this.questionList);
    },
    PrefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    }
  }
};
</script>
<style lang="less" scoped>
@rem: 75rem;
.page {
  font-size: 12px;
  padding: 0 10px;
  .activity-detail-pic {
    width: 100%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .activity-detail-info {
    .detail-info-item {
      display: flex;
      padding: 10px 0;
      .info-item-lable {
        width: 20%;
      }
      .info-item-desc {
        width: 80%;
        color: #666;
      }
    }
  }
  .detail-footer {
    margin-top: 88 / @rem;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid #f4f4f4;
    padding: 10px 0;
    .ensure-btn,
    .cancle-btn {
      width: 690 / @rem;
      height: 88 / @rem;
      border-radius: 8 / @rem;
      line-height: 88 / @rem;
      text-align: center;
      color: #fff;
      background: #c6aa85;
      border-radius: 3px;
    }
    .participated {
      background: #999;
    }
  }

  .wrapActivity {
    .title {
      // margin: 0 10px;
      text-align: center;
      line-height: 88 / @rem;
      border-bottom: 1px solid black;
      font-size: 32 / @rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e0e6ed;
      position: relative;
      img {
        position: absolute;
        left: 11px;
        top: 13px;
      }
    }
    .formContanier {
      height: 100%;
      background: #fff;
    }
    .uploadImg {
      display: block !important;
      .img_container {
        position: relative;
        .img_close {
          width: 40 / @rem;
          height: 40 / @rem;
          background: rgba(35, 35, 33, 1);
          opacity: 0.8;
          border-radius: 20 / @rem;
          position: absolute;
          right: -9px;
          top: -9px;
        }
      }
    }
  }
  .wrapInput {
    // border-bottom: 1px solid #e0e6ed;
    margin-top: 32px;
    &:last-child {
      border-bottom: 0 solid #fff !important;
    }
    &:last-of-type {
      border-bottom: 0 solid #fff !important;
    }
    .wrap-header {
      display: flex;
      font-size: 20px;
      line-height: 24px;
      .wrap-header__l {
        color: #4679a3;
      }
      .wrap-header__r {
        font-size: 17px;
        font-weight: bold;
        margin-left: 4px;
      }
    }
    /deep/.van-field__body {
      padding-left: 10px;
      input,
      textarea {
        border-bottom: 1px solid #e0e6ed;
      }
    }
  }
  .borderStyle:last-child {
    border-bottom: #fff !important;
  }
  .fillPopup {
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
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>

<style lang="less">
@rem: 75rem;
.wrapActivity {
  input::-webkit-input-placeholder {
    font-size: 30 / @rem !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(213, 216, 219, 1);
  }
  .frameCheckBox {
    .van-field__value {
      // text-align: left;
      // margin: 0 0 0 3px;
      .van-field__body {
        // display: inline-block;
      }
    }
  }
  .van-checkbox-group {
    // display: flex;
    // flex-wrap: wrap;
    width: 100%;
    margin: 20px 0 0 0;
  }
  input {
    padding-left: 5px;
  }
  .van-field {
    &.van-cell {
      line-height: 60 / @rem;
      padding: 0 !important;
      .van-field__label {
        width: 128 / @rem !important;
        font-size: 30 / @rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(133, 135, 140, 1);
        margin-right: 56 / @rem;
        span {
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
  .van-image__img {
    display: block;
    width: 160 / @rem;
    height: 160 / @rem;
  }
  .margin_bt7 {
    margin-bottom: 7px;
    margin-left: 5px;
  }
  .van-calendar__selected-day {
    background-color: #c6aa85 !important;
  }
  .van-button--danger {
    background-color: #c6aa85;
    border: 0.026667rem solid #c6aa85;
  }
}
.frameCheckBox {
  .van-radio-group {
    margin-top: 20px;
    .van-radio {
      margin-bottom: 8px;
    }
  }
}
</style>
