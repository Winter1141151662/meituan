<template>
    <div class="page-register">
        <div class="header">
            <header>
                <a href="#" class="site-logo"></a>
                <div class="login">
                    <span>已有美团账号</span>
                    <router-link :to="{name:'login'}">登录</router-link>
                </div>
            </header>
        </div>
        <div class="content">
            <el-form 
            :model="registerFrom" 
            status-icon 
            :rules="rules" 
            ref="registerFrom" 
            label-width="100px" 
            class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model="registerFrom.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerFrom.password" autocomplete="off" @input="input"></el-input>
                    <div class="pw-strength">
                        <div :class="['bar', strengthClass]"></div>
                        <div class="letter">
                            <span>弱</span>
                            <span>中</span>
                            <span>强</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input type="password" v-model="registerFrom.rePassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerFrom')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <footer></footer>
    </div>
</template>
<script>
export default {
    data(){
        var validateUser= (rule,value,callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            }else if (value.length < 4 || value.length>16){
                callback(new Error('用户名必须为4-16位的字母数字下划线组成'))
            }else {
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            let numReg = /[0-9]+/g;
            let strReg = /[A-z]+/g;
            let result;
            if(numReg.test(value) && strReg.test(value)){
                result= true 
            }else{
                result = false
            }
            let allresult = (/(\W)+/g).test(value)
              if (value === '') {
                callback(new Error('请输入密码'));
              } else if (value.length < 6 || value.length>16 || !result || allresult){
                callback(new Error('密码必须为6-16位的字母数字下划线组成'))
                }else{
                if (this.registerFrom.password !== '') {
                  this.$refs.registerFrom.validateField('rePassword');
                }
                callback();
              }
            };
        var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.registerFrom.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
        return {
            registerFrom:{
                userName:'',
                password:'',
                rePassword:'',
            },
            strengthClass:"",
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                rePassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                userName: [
                    { validator: validateUser, trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/register',{params:this.registerFrom}).then(res => {
                if(res.data.status =='success'){
                    alert('注册成功');
                    this.$router.push({name:'login'});
                }else{
                    alert(res.data.msg)
                }
            })
          } 
        }); 
        },
        input(val){
            if(val.length>10){
                this.strengthClass = 'strong'
            }else if (val.length > 6){
                this.strengthClass = 'normal'
            }else if (val.length>0){
                this.strengthClass = 'week'
            }else{
                this.strengthClass = ''
            }
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/register/index.scss";
</style>