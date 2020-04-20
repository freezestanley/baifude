<template>
    <div @click="activityDetail">陪伴孩子成长，享受天真快乐</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        activityDetail(){
            this.$router.push({path:'/corporateactivity/activitydetail',query:''});
        }
    }
}
</script>
<style scoped>

</style>