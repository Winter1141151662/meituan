<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseLeave">
            <dt>全部分类</dt>
            <dd v-for="(item,index) in menuList"
            :key="index"
            @mouseenter="mouseEnter(item)"
            >
                <i :class="item.type"></i>
                {{ item.name }}
                <span class="arrow"></span>
            </dd>
        </dl>
        <div class="detail" 
        v-if="curDetail"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave">
            <template v-for="(item,index) in curDetail.items">
                <h4 :key="index">{{ item.title }}</h4>
                <span v-for="(child,index) in item.items"
                :key="index+'_'+child">{{ child }}</span>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            timer:null,
            curDetail:null,
            menuList:[]
        }
    },
    created(){
        this.$axios.get('/index/nav.json').then(res => {
            this.menuList = res
        })
    },
    methods:{
        mouseEnter(data){
            this.curDetail = data;
        },
        mouseLeave(){
            this.timer = setTimeout(()=>{
                this.curDetail = null;
            },300)
        },
    }
}
</script>