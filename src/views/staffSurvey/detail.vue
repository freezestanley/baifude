<template>
    <div>
        <div class="wrap">
            <div class="title">企业员工返岗调查表</div>
            <div class="formContanier">
                <van-form @submit="onSubmit" :show-error="false">
                    <van-field
                        v-model="activityData.username"
                        label="您的姓名:"
                        placeholder="请输入内容"
                        :rules="[{ required: true, message: '请输入内容' },{ validator, message: '请输入正确内容' }]"
                        class="frameInput"
                    />
                    <van-field
                        v-model="activityData.part"
                        label="部门:"
                        placeholder="请输入内容"
                        :rules="[{ required: true, message: '请输入内容' }]"
                        class="frameInput"
                    />
                    <van-field
                        v-model="activityData.date"
                        label="预计返岗日期:"
                        placeholder="请输入内容"
                        :rules="[{ required: true, message: '请输入内容' }]"
                        class="frameInput"
                    />
                    <van-field
                        v-model="activityData.area"
                        label="您所在的地区:"
                        placeholder="请输入内容"
                        :rules="[{ required: true, message: '请输入内容' }]"
                        class="frameInput"
                    />
                    <van-field class="break_all" name="checkboxGroup" label="返岗交通方式" :rules="[{ required: true, message: '请选择内容' }]">
                        <template #input>
                            <van-checkbox-group v-model="activityData.checkBackTracking" direction="horizontal">
                            <van-checkbox name="1" shape="square">飞机</van-checkbox>
                            <van-checkbox name="2" shape="square">火车</van-checkbox>
                            <van-checkbox name="3" shape="square">自驾</van-checkbox>
                            <van-checkbox name="4" shape="square">大巴</van-checkbox>
                            </van-checkbox-group>
                        </template>
                    </van-field>
                    <van-field
                        v-model="activityData.area"
                        label="是否需要公司提供疫情相关帮助，如有，请详细说明"
                        placeholder="请输入内容"
                        type="textarea"
                        class="frameInput break_all"
                    />
                    <div style="width: 80px;text-align:center;margin:30px auto" >
                        <van-button round block type="info" size="small" native-type="submit">
                        提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            activityData:{
                username:"", //您的姓名
                part:"", //部门
                date:"", //预计返岗日期
                area:"",
                checkBackTracking:[],
            }
        }

    },
    methods:{
        onSubmit(){
            console.log(this.activityData);
        },
        validator(val) {
            return /1/.test(val);
        }
    }
}
</script>
<style lang="less" scoped>
.wrap{
    .title{
        text-align: center;
        font-size: 23px;
        line-height: 51px;
    }
    .formContanier{
        margin-top: 20px;
    }
}
</style>
<style lang="less">
.wrap{
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
    
    
}
</style>