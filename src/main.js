import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/main.css';

import store from "./store.js";
import axios from './http.js'
import router from './router/index.js';
import ElementUI from 'element-ui';




Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.directive('document-click', {
    bind(el, binding) {
        document.addEventListener('click', binding.value, false)
    }
})




new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')