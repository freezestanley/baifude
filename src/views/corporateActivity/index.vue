<template>
    <section class="page">
        <Activity :data="list"></Activity>
    </section>
</template>

<script>
    import Activity from './components/activityItem'
export default {
    data(){
        return {
          list:[
            {"pic":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587385230756&di=366f4dfe738f6f9db88f374a2f9d1893&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181105%2F20%2F1541422050-ZzanIJQjpv.jpg","title":"陪伴孩子成长，享受天真快乐","statusDesc":"报名中"},
            {"pic":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3257444195,3291178773&fm=26&gp=0.jpg","title":"用快乐搅拌，用甜蜜点缀","statusDesc":"即将开始"},
            {"pic":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320899456,3455234350&fm=26&gp=0.jpg","title":"用快乐搅拌，用甜蜜点缀","statusDesc":"已报名"},
            {"pic":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=313099192,176112715&fm=26&gp=0.jpg","title":"用快乐搅拌，用甜蜜点缀","statusDesc":"已报名"},
          ],
        }
    },
  components:{
    Activity,
  },
    methods:{
        activityDetail(){
            this.$router.push({path:'/corporateactivity/activitydetail',query:''});
        }
    }
}
</script>
<style lang="less" scoped>
.page{
    padding: 0 10px;
    font-size: 14px;
}
</style>