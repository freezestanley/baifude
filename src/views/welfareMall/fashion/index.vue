<template>
    <div>
        <div>fashion</div>
        <navArea></navArea>
        <component
            :is="ford.comp"
            :content="ford.data"
            v-for="(ford, index) of fords"
            :key="index"
        ></component>
    </div>
    
</template>
<script>
  import { mapState } from "vuex";
  import navArea from './components/navArea'
export default {
    data(){
        return {
          fords:[],
        };
    },
    created(){
        this.getData()
    },
    components: {
        navArea
    },
    methods:{
        getData(){
          if(this.unionAndPlatform){
            this.unionAndPlatform.forEach(unionMod => {
              this.fords.push({
                data: unionMod,
                comp: () => import(`@/components/${unionMod.formatCode}`)
              });
            });
          }
        }
      },
    computed: {
        ...mapState({
          unionAndPlatform:state => state.unionAndPlatform,//十大模块
        }),

      },
    
}
</script>
<style scoped>

</style>