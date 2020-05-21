<template>
  <section class="page">
    <div style="height: 1.226667rem;width: 100%;"></div>
    <div class="survey-detail" v-if="!endStatus">
      <div class="survey-detail-header">
        <div class="survey-detail-title">
          <div class="survey-detail-l">
            <div class="title">{{ detail.title }}</div>
            <div class="date" v-if="detail.startTime">
              <img class="surveyTimeImg" :src="surveyTimeIcon">
              <span>
                {{
                  `${detail.startTime.split(" ")[0]} 至 ${
                    detail.endTime.split(" ")[0]
                  }`
                }}
              </span>
            </div>
          </div>
          <!-- <div class="survey-detail-r">“</div> -->
        </div>
        <div class="desc">
          {{ detail.description }}
        </div>
      </div>
      <div class="survey-detail-content">
        <custom-from
          :questionList="questionList"
          :startTime="startTime"
          @onSubmit="onSubmit"
        />
      </div>
    </div>
    <div class="end-survey" v-else>
      <img :src="overdueIcon" alt="" />
      <div class="overdue-text">本次调研已经结束了，再去看看别的调研吧~</div>
    </div>
  </section>
</template>
<script>
import {
  cms_researchGet,
  cms_researchSubmit,
  cms_researchUserDetail
} from "@/assets/apis/home";
import utilRes from "@/assets/utils/resResult";
import customFrom from "./components/customFrom";
// import Toast from "@/components/toast/toast";
import { Toast } from "vant";
import overdueIcon from "@/assets/images/survey/overdue-icon.png";
import surveyTimeIcon from "@/assets/images/survey/surveyTime.png";

export default {
  components: {
    "custom-from": customFrom
  },
  data() {
    return {
      detail: {
        questionList: []
      },
      questionList: [],
      startTime: false,
      endStatus: false,
      overdueIcon: overdueIcon, // 过期图标
      surveyTimeIcon:surveyTimeIcon
    };
  },
  async created() {
    this.researchGet();
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    async researchGet() {
      let params = { id: this.id };
      const obj = { ...params };
      let res = await cms_researchGet(obj);
      if (utilRes.successCheck(res)) {
        this.detail = res.data; //请求返回当页的列表
        if (this.detail.questionList.length > 0) {
          const { participateStatus } = res.data;
          // 已过期
          if (
            this.detail.endTime &&
            new Date(this.detail.endTime) - new Date() <= 0
          ) {
            this.endStatus = true;
            return false;
          }
          // 未开始
          this.startTime = this.detail.startTime;
          // if (
          //   this.detail.startTime &&
          //   new Date(this.detail.startTime) - new Date() > 0
          // ) {
          //   this.startStatus = true;
          // }

          this.questionList = this.detail.questionList.map(item => {
            // 添加字段
            switch (item.type) {
              //   case 1: // 单选
              //     return { ...item, optionsValue: "" };
              case 2: // 多选
                return { ...item, optionsValue: [] };
              //   case 3: // 文本
              //     return { ...item, optionsValue: "" };
              default:
                return { ...item, optionsValue: "" };
            }
          });
          if (participateStatus === 1) {
            // 已参与
            this.getParticipateDetail(this.id);
          }
        }
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    // 获取已参与详情
    async getParticipateDetail(researchId) {
      let res = await cms_researchUserDetail({ researchId });
      if (utilRes.successCheck(res)) {
        const { questions } = res.data;
        if (questions && questions.length > 0) {
          questions.map(item => {
            //this.questionList =
            for (let i = 0; this.questionList.length > i; i++) {
              if (item.id === this.questionList[i].id) {
                switch (item.type) {
                  case 1: // 单选
                    this.questionList[i].optionsValue =
                      item.selectedOptionIds[0];
                    break;
                  case 2: // 多选
                    this.questionList[i].optionsValue = item.selectedOptionIds;
                    break;
                  case 3: // 文本
                    this.questionList[i].optionsValue = item.text;
                    break;
                  default:
                    this.questionList[i].optionsValue = item.text;
                }
              }
            }
          });
        }
      } else {
        this.$message({
          type: "error",
          message: res.errMsg ? res.errMsg : "调用接口失败!"
        });
      }
    },
    async onSubmit(formObj) {
      let params = {
        researchId: this.detail.id
      };
      params.questions = formObj.map(item => {
        const itemObj = {
          researchQuestionId: item.id,
          type: item.type
        };
        // 添加字段
        switch (item.type) {
          case 1: // 单选
            itemObj.researchQuestionOptionId = item.optionsValue;
            break;
          case 2: // 多选
            itemObj.researchQuestionOptionIdList = item.optionsValue;
            break;
          default:
            // 文本
            itemObj.text = item.optionsValue;
            break;
        }
        return itemObj;
      });
      let resData = await cms_researchSubmit(params);
      const { data: res } = resData;
      if (utilRes.successCheck(resData)) {
        Toast("参与调研成功");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      } else {
        // Toast.show({
        //   content: res.errMsg || "调用接口失败",
        //   isSuccess: false,
        //   duration: 1000
        // });
        Toast(res.errMsg || "调用接口失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  font-size: 15px;
  padding: 0 15px;
  .survey-detail {
    .survey-detail-header {
      margin: 10px 0;
      position: relative;
      .survey-detail-title {
        .survey-detail-l {
          .surveyTimeImg{
            height: 20px;
            vertical-align: sub;
          }
          .title {
            font-size: 18px; //28
            width: 85%;
            font-weight: 800;
            color: rgba(0, 0, 0, 1);
            line-height: 1.5;
          }
          .date {
            margin: 8px 0;
            font-size: 15px;
            line-height: 20px;
            color: #666666;
          }
        }
        .survey-detail-r {
          position: absolute;
          right: 0;
          top: 30px;
          bottom: 0;
          margin: auto 0;
          width: 60px;
          height: 60px;
          font-size: 120px;
          font-weight: normal;
          color: rgba(0, 0, 0, 1);
          line-height: 138px;
          background: linear-gradient(
            249deg,
            rgba(70, 121, 163, 1) 0%,
            rgba(70, 121, 163, 0) 100%
          );
          transform: rotate(180deg);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .desc {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin: 2px 0;
      }
    }
    .survey-detail-content {
      margin-top: 10px;
    }
  }
  .end-survey {
    padding: 100px 0;
    height: 100%;
    img {
      width: 100%;
    }
    .overdue-text {
      text-align: center;
      font-size: 15px;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 26px;
    }
  }
}
</style>
