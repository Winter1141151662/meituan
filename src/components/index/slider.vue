<template>
    <div class="slide">
         <el-carousel height="240px">
           <el-carousel-item v-for="item in imgList" :key="item.image">
               <img :src="item.image" alt="">
           </el-carousel-item>
         </el-carousel>
  </div>
</template>
<script>
export default {
    data(){
        return{
            imgList:[{
                url:'xx',
                image:'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
            },{
                url:'xxs',
                image:'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg'
            },{
                url:'xxxxx',
                image:'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
            },{
                url:'xxas',
                image:'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg'
            },{
                url:'asdasd',
                image:'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png'
            }]
        }
    }
}
</script>