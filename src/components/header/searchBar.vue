<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <router-link to="/">
                <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
                </router-link>
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input v-model="searchWord" placeholder="请输入内容" @focus="focus" @blur="blur" @input="input"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(hotplace,index) in hotPlaceList.slice(0,5)"
                        :key="index">
                            <router-link :to="{name:'goods', params:{name:hotplace}} ">{{ hotplace }}</router-link>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSeachList" >
                        <dd v-for="(item,index) in searchList"
                        :key="index">
                            <router-link :to="{name:'goods',params:{name:search}}">{{ item }}</router-link>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="#" v-for="(suggest,index) in suggestList"
                    :key="index">
                    {{ suggest }}
                    </a>
                </p>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    data(){
        return {
            searchWord:'',
            isFocus:false,
            hotPlaceList:[],
            searchList:[],
            suggestList:[],
            timer:null,
        }
    },
    created(){
        this.$axios.get('/header/searchHotWords.json').then(res => {
            this.hotPlaceList = res;
            this.suggestList = res;
        })
    },
    computed:{
        isHotPlace(){
            return this.isFocus && !this.searchWord
        },
        isSeachList(){
            return this.isFocus && this.searchWord
        }
    },
    methods:{
        focus(){
            this.isFocus = true
        },
        blur(){
            setTimeout(() => {
                this.isFocus = false
            }, 500);
        },
        input(){
            clearTimeout(this.timer)
            this.timer = setTimeout(this.getInputData,500)
        },
        getInputData(){
            let val = this.searchWord
            this.$axios.get('/header/search.json').then(res => {
                this.searchList = res.list.filter(item => item.indexOf(val) >-1)
            })
        }
    }
}
</script>
