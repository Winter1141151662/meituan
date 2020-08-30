<template>
    <div class="page-changeCity">
        <el-row>
            <province />
        </el-row>
        <el-row>
            <hot title="热门城市:" :list="hotList" />
        </el-row>
        <el-row>
            <hot title="最近访问:" :list="rencentList" />
        </el-row>
        <el-row>
            <category />
        </el-row>
    </div>
</template>
<script>
import Province from '@/components/changeCity/province.vue';
import Hot      from '@/components/changeCity/hot.vue';
import Category from '@/components/changeCity/category.vue';

export default {
    data(){
        return{
            hotList:[],
            rencentList:[]
        }
    },
    created(){
        this.$axios.get('/city/hot.json').then(res =>{
            this.hotList = res
        })
        this.$axios.get('/city/recents.json').then(res => {
            this.rencentList = res
        })
    },
    components:{
        Province,
        Hot,
        Category
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/changecity/iselect.scss";
</style>
