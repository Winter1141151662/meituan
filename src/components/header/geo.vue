<template>
  <div class="m-geo">
    <div class="position">
        <i class="el-icon-location-outline" />
        {{$store.state.position}}
        <router-link class="changeCity" :to="{name:'changeCity'}">
            切换城市
         </router-link>
         [
            <a href="#"
            v-for="(city,index) in nearCity"
            :key="index"
            >{{city}}</a>
         ]
    </div>
    <div class="m-user" v-if="!$store.state.userName">
        <router-link class="login" :to="{name:'login'}">
          立即登录
        </router-link>
        <router-link class="register" :to="{name:'register'}">
          注册
        </router-link>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      nearCity:[]
    }
  },
  created(){
    this.$axios.get('/city/getPosition.json').then(res => {
      this.$store.dispatch('setPosition',res.name);
      this.nearCity = res.nearCity.map(city => city.name)
      console.log(this.$store.state.positon)
    })
  },
    watch: {
      "$store.state.position": function () {
            this.nearCity = this.$store.state.position.nearCity;
      }
    },
};
</script>