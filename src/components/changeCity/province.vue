<template>
    <div >
       <span class="name">省份选择:</span>
       <m-select 
       :list="provinceList" title="省份" 
       :value="province"
       :showWrapperActive="provinceActive"
       @change_active ="changeProvinceActive"
       @change="changeProvince"
       className="province"
        />
       <m-select 
       :list="cityList" title="城市" 
       :value="city"
       :showWrapperActive="cityActive"
       @change_active ="changeCityActive"
       @change="changeCity"
       :disabled ="cityDisabled"
       className="city"
        />
        <span>直接搜索</span>
        <el-select
        v-model="searchWord"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        >
            <el-option
                v-for="item in searchList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import MSelect from './select.vue'
export default {
    data(){
        return {
            allData:[],
            provinceList:[],
            province:'省份',
            cityList:[],
            city:'城市',
            provinceActive:false,
            cityActive:false,
            searchList:['山东','山东1','山东2','山东3','山东4','山东34'],
            searchWord:'',
            loading:false,
            cityDisabled:true
        }
    },
    components:{
        MSelect
    },
    created(){
        this.$axios.get('/city/province.json').then(res => {
            this.allData = res
            this.provinceList = res.map(item => item.provinceName)
        })
    },
    methods:{
        changeProvinceActive(flag){
            this.provinceActive= flag;
            if(this.cityActive){
                this.cityActive = false
            }
        },
        changeCityActive(flag){
            this.cityActive= flag;
            if(this.provinceActive){
                this.provinceActive = false
            }
        },
        changeProvince(item){
            this.cityDisabled = false;
            this.province = item;
            this.cityList = this.allData.filter(list => list.provinceName == item)[0].cityInfoList.map(city => city.name)     
        },
        changeCity(item){
            this.city = item;
            this.$store.dispatch('setPosition',item)
            this.$router.push({name:'index'})
        },
        remoteMethod(){
            console.log(this.searchWord)
        }
    }
}
</script>