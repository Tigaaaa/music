<template>
    <div class="loging-warp">
        <div class="loging-box">
            <div class="log-top">登录
                <a href="#" @click="close">×</a>
            </div>
            <div class="bd">
                <div class="pho-box">
                    <a>+86</a>
                    <input type="text" placeholder="请输入手机号码" v-model="phoneNum"/>
                </div>
                <div class="pwd-box">
                    <input class="captcha" type="text" placeholder="请输入验证码" v-model="captcha"/>
                    <div class="open-sty" @click="yanzm" :class="{'close-sty':!canClick||time}">
                        <p v-show="time==0">获取验证码</p>
                        <p v-show="time!=0">剩余{{time}}s</p>
                    </div>
                </div>
                <div class="other">
                    <a href="#" class="hov">密码登录</a>
                    <label for="check">
                    <input type="checkbox" id="check" />
                    自动登录
                    </label>
                </div>
                <div class="log-but" @click="loging">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getCaptcha,sentCaptcha,getUser} from '@/utils/api.js'

export default{
    name:'logingBox',
    data(){
        return{
            canClick:false,
            time:0,
            phoneNum:"",
            captcha:""
        }
    },
    methods:{
        yanzm(){
            if(this.canClick&&this.time==0){
                getCaptcha(this.phoneNum)
                .catch((err)=>{
                    console.log(err)
                });
                this.time=3;
                let timer=setInterval(()=>{
                    this.time--;
                    if(this.time==0)
                        clearInterval(timer);
                },1000)
            }
        },
        close(){
            this.$emit('close');
        },
        loging(){
            if(this.phoneNum&&this.captcha){
                sentCaptcha(this.phoneNum,this.captcha)
                .then(()=>{
                    this.$emit('close');
                    getUser()
                    .then((res)=>console.log(res.data))
                    .catch((err)=>console.log(err));
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            else{
                alert("请输入验证码！");
            }
        }
    },
    watch:{
        phoneNum(num){
            if(/[1]/.test(num))
                this.canClick=true;
            else
                this.canClick=false;
        }
    }
    
}
</script>

<style scoped>
.loging-warp{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;

  display:flex;
  align-items:center;
  justify-content:center;
}
.loging-box{
  width:530px;
  background:#fff;
  border-radius:4px;
  z-index:9998;
  overflow:hidden;
}

.log-top{
    height:38px;
    line-height:38px;
    padding:0 45px 0 18px;
    background:#333;
    color:#eee;
    position:relative;
}
.log-top a{
    position:absolute;
    right:20px;
    font-size:18px;
    font-style:normal;
    color:#eee;
}

.bd{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:326px;
}
.pho-box,.pwd-box{
    width:60%;
    height:32px;
    line-height:32px;
    text-align:center;
    margin:5px 0;
}

.pho-box{
    border-radius:4px;
    border:1px solid #ddd;
}
.pho-box a{
    width:18%;
    height:32px;
    border-right:1px solid #ddd;
    float:left;
}
.pho-box input{
    width:75%;
    height:32px;
    padding:0 0 0 8px;
    float:left;
}

.pwd-box input{
    width:60%;
    height:32px;
    border-radius:4px;
    border:1px solid #ddd;
    padding:0 0 0 8px;
    float:left;
}
.open-sty{
    width:35%;
    height:32px;
    line-height:32px;
    text-align:center;
    background:#fff;
    border:1px solid #ddd;
    border-radius:4px;
    float:right;
}
.close-sty{
    background:#ddd;
}

.other{
    width:60%;
    margin-bottom:15px;
}
.other a{
    float:left;
}
.other label{
    float:right;
}

.log-but{
    width:60%;
    height:32px;
    line-height:32px;
    text-align:center;
    border-radius:4px;
    background:#333;
    color:#fff;
}
</style>