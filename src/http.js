import axios from 'axios';

axios.defaults.baseURL = 'http://open.duyiedu.com/api/meituan';


// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    config.params = {
        ...config.params,
        appkey: "13221698323_1590670227423",
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
axios.interceptors.response.use(function(response) {

    if (response.status == 200) {
        if (response.config.url !== "/login" && response.config.url !== "/register") {
            return response.data.data;
        }

        return response

    }

})


export default axios;