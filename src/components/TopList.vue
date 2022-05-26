<template>
  <div class="theMain">
    <div class="m-top">
    <div class="top">
    <div class="logo"><a hidefocus="true" href="/#">音乐播放器</a></div>
      <ul class="m-nav">
        <li class="fst">
          <span><router-link to="/discover" active-class="z-slt" hidefocus="true" href="/#"><em>发现音乐</em><sub class="cor">&nbsp;</sub></router-link></span>
        </li>
        <li>
          <span><router-link to="/myMusic" active-class="z-slt" hidefocus="true" href="/#"><em>我的音乐</em><sub class="cor">&nbsp;</sub></router-link></span>
        </li>
        <li>
          <span><router-link to="/myFollow" active-class="z-slt" hidefocus="true" href="/#"><em>关注</em><sub class="cor">&nbsp;</sub></router-link></span>
        </li>
        <li>
          <span><router-link to="/theStore" active-class="z-slt" hidefocus="true" href="/#"><em>商城</em><sub class="cor">&nbsp;</sub></router-link></span>
        </li>
        <li>
          <span><router-link to="/d" active-class="z-slt" hidefocus="true" href="/#"><em>下载客户端</em><sub class="cor">&nbsp;</sub></router-link></span>
        </li>
      </ul>
       <div class="load">
      <a class="loadBut" hidefocus="true" href="#" @click="close" >登录</a>
      </div>
      <logingBox v-if="logbox" @close="close"/>
      <div class="selectIn">
        <router-link class="el-icon-search" :to="{
          path:'/search',
          query:{
            keyword:keyword,
            type:fstType
          }
        }" >
        </router-link>
        <input type="text" v-model="keyword" 
        @keyup.enter="select" placeholder="音乐/视频/电台/用户"/>
      </div>
      </div>
   </div>
  </div>

</template>

<script>
import logingBox from '../view/logingBox.vue'

export default {
  name: 'TopList',
  data(){
    return{
      ifFocus:false,
      keyword:"",
      fstType:1,
      logbox:false
    }
  },
  methods:{
    select(){
      this.$router.push({
        path:'/search',
        query:{
          keyword:this.keyword,
          type:this.fstType
        }
      });
    },
    close(){
      this.logbox=!this.logbox;
    }
  },
  components:{
    logingBox
  }
}
</script>

<style scoped>
.theMain{
  width:100%;
}
.theMain::after{
  content:"";
  clear:both;
  display:block;
}
.m-top {
  z-index:1000;
  position: relative;
  height: 70px;
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000
}
.top{
  width:1100px;
  height:70px;
  margin:0 auto;
}

.logo{
    float: left;
    width: 157px;
    text-align:center;
    height:69px;
    line-height:69px;
    padding:0 20px 0 0;
}
.logo a{
  color:white;
  font-size:28px;
}

.m-nav .cor {
    display: none;
}
.m-nav li{
  position:relative;
}
.m-nav li.lst, .m-nav li.fst span {
    background: none;
}
.m-nav li, .m-nav li span, .m-nav a, .m-nav a em {
    height: 70px;
    color:#ccc;
    text-align:center;
    line-height:70px;
    font-size:14px;
    font-style:normal;

    float: left;
}
.m-nav a{
  padding: 0 19px;
}
.m-nav a:hover , .m-nav a.z-slt {
    background: #000;
    text-decoration: none;
    color: white;
}
.m-nav a.z-slt .cor{
    display: block;
    position: absolute;
    left: 50%;
    transform:translateX(-50%);
    bottom: 0;
    width:0;
    height:0;
    overflow: hidden;
 
    border-bottom:7px solid #C20C0C;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
}

.selectIn{
  border-radius:20px;
  background:#fff;
  padding:5px;
  margin-top:19px;
  position:relative;
  float:right;
}
.selectIn a{
  line-height:16px;
  font-size:12px;
  margin-left:5px;
}
.selectIn input{
  margin-left:10px;
}
.selectIn lable{
  color: #9b9b9b;
  font-size:12px;
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  right:40px;
}

.load{
  width:40px;
  height:28px;
  line-height:28px;
  text-align:center;
  border-radius:10px;
  margin:19px 0 0 20px;

  float:right;
}
.load a{
  width:40px;
  height:28px;
  font-size:12px;
  color:#c7c7c7;
}
.load:hover{
 background:#000; 
}


</style>

