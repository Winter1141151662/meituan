<template>
    <dl class="s-item">
        <dt>
            <img :src="meta.image" alt="">
        </dt>
        <dd>
            <h3>
                <router-link :to="{name:'productDeatil'}">{{meta.title}}</router-link>
            </h3>
            <p>
                <el-rate
                  v-model="myScore"
                  disabled
                  text-color="#ff9900"
                  score-template="{myScore}">
                </el-rate>
                <span>{{myValue}}</span>
                <span>{{meta.score}}分</span>
                <span class="s-item-comment-total">{{meta.commentNum}}人评论</span>
            </p>
            <p>
                <span 
                class="s-item-tab"
                v-for="(v,i) in meta.tab"
                :key="v"
                >
                {{v+(meta.tab[i+1]?"|":"")}}
                </span>
                <span class="s-item-addr">{{meta.address}}</span>
                <span>
                    <a href="#">
                        <i class="el-icon-map-location"></i>
                        查看地图
                    </a>
                </span>
            </p>
            <p>
                <span class="s-item-price">
                    人均💴💴    {{meta.avgPrice}}
                </span>
            </p>
            <ul class="deal-items">
                <li 
                class="items"
                v-for="(item,index) in meta.dealItems.slice(0,2)"
                :key="index"
                >
                <p class="deal-title">
                    {{item.title}}
                </p>
                <p>
                    <span class="deal-price">
                        又要💴{{item.price}}
                    </span>
                    <span class="deal-old-price">
                        虚晃价￥{{item.counterPrice}}
                    </span>
                    <span class="deal-sales">
                        已售{{item.saleNum}}
                    </span>
                </p>
                </li>
            </ul>
        </dd>
    </dl>

</template>
<script>
export default {
    props:[
        'meta'
    ], 
    computed:{
        myValue(){
            let score =  (+this.meta.score)
            if(score > 4.5){
                return "很好"
            }else if (score > 4){
                return "好"
            }else if (score > 3.5){
                return "不错"
            }else if (score > 3){
                return "一般"
            }else {
                return "很差"
            }
        },
        myScore(){
            return +this.meta.score
        }
    }
}
</script>