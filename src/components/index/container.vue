<template>
    <div class="m-istyle">
        <dl 
        :class="navList.class"
        @mouseover="over"
        >
            <dt>{{navList.title}}</dt>
            <dd 
            v-for="(item,index) in navList.list"
            :key="index"
            :class="{active: kind == item.tab}" :data-type="item.tab">{{item.text}}</dd>
        </dl>
        <ul class="ibody">
            <li v-for="(item,index) in resultData[kind]"
            :key="index">
               <el-card :body-style="{ padding: '0px' }" >
                 <img :src="item.image" class="image">
                     <div class="cbody">
                         <div class="title" :title="item.title">{{item.title}}</div>
                         <div class="sub-title" :title="item.subTitle">{{item.subTitle}}</div>
                         <div class="price-info">
                             <span class="current-price-wrapper">
                             <span class="price-symbol numfont">¥</span>
                             <span class="current-price numfont">{{item.price}}</span>
                             </span>
                             <span class="old-price">门市价💴{{ item.price+1000 }}</span>
                             <span class="sold bottom-right-info">{{item.address}}</span>
                         </div>
                     </div>
                 </el-card>
            </li>
        </ul> 
    </div>
</template> 
<script>
export default {
    props:[
        'navList'
    ],
    data(){
        return {
            kind:'all',
            resultData:{},
        }
    },
    created(){
    this.$axios.get('/index/resultsByKeywords.json').then(res => {
        this.resultData = res
        })
    },
    methods:{
        over(e){
            const target = e.target;
            if(target.tagName!=="DD"){
                return
            }else{
                this.kind = target.getAttribute('data-type')
            }
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/index/artistic.scss';
</style>