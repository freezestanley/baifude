<template>
    <div class="news-module">
        <div class="module-item">
            <Title titleName="活动风采" :titleMore="true" @goToNext="goToNext"></Title>
            <NewListItem></NewListItem>
            <NewsCardItem></NewsCardItem>
        </div>
    </div>
</template>

<script>
    import Title from "@/components/moduleTtile/index";
    import NewListItem from "./NewListItem";
    import NewsCardItem from "./NewsCardItem";
    export default {
        name: "index",
        data(){
            return{

            }
        },
        components:{
            Title,
            NewListItem,
            NewsCardItem,
        },
        created() {
        },
        methods:{
            goToNext(){
                console.log(121212)
            },
        }
    }
</script>

<style scoped lang="less">
.news-module{
    padding: 0 15px;
}
</style>