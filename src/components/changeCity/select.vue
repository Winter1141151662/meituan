<template>
    <div :class="['choose-wrap',disabled? 'disabled':'']" @click="showWrapper" v-document-click="documentClick">
        <div class="choose">
            <span>{{value}}</span>
             <i class="el-icon-caret-bottom"></i>
             <div :class="{'mt-content':true,'active': showWrapperActive}">
                 <h2>{{title}}</h2>
                 <div :class="['wrapper', className]">
                    <div class="col"
                    v-for="(listData,index) in resultList"
                    :key="index">
                        <span 
                        :class="{'mt-item':true,'active': item == value}"
                        v-for="(item,index) in listData"
                        :key="index"
                        @click="changeValue(item)"
                        >{{item}}</span>
                    </div>
                 </div>
             </div> 
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:[
        "list",
        'title',
        'value',
        'showWrapperActive',
        'className',
        'disabled'
    ],
    computed:{
        resultList(){
            const col = Math.ceil(this.list.length / 12);
            const resultList = []
            for (let i = 0; i < col; i++) {
                let data = this.list.slice(12 * i, 12 * i + 12);
                resultList.push(data)
            }
            return resultList
            }
    },
    methods:{
        showWrapper(e){
            e.stopPropagation()
            if(!this.disabled){
                this.$emit('change_active',true)
            }
            
        },
        documentClick(){
            this.$emit('change_active',false)
        },
        changeValue(item){
            this.$emit('change',item)
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/select.scss';
</style>