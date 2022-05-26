<template>
<div class="warp">
  <div class="nav-warp">
    <ul class="nav">
      <li>
        <span><router-link to="recommend" active-class="z-slt" hidefocus="true" href="/#"><em>推荐</em></router-link></span>
      </li>
      <li>
        <span><router-link to="ranking" active-class="z-slt" hidefocus="true" href="/#"><em>排行榜</em></router-link></span>
      </li>
      <li>
        <span><router-link to="playlist" active-class="z-slt" hidefocus="true" href="/#"><em>歌单</em></router-link></span>
      </li>
      <li>
        <span><router-link to="/c" active-class="z-slt" hidefocus="true" href="/#"><em>主播电台</em></router-link></span>
      </li>
      <li>
        <span><router-link to="/d" active-class="z-slt" hidefocus="true" href="/#"><em>歌手</em></router-link></span>
      </li>
      <li>
        <span><router-link to="/d" active-class="z-slt" hidefocus="true" href="/#"><em>新碟上架</em></router-link></span>
      </li>
    </ul>
</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'discoverMusic',
}
</script>

<style scoped>
.warp{
  width:100%;
  height:35px;
  background-color: #C20C0C;
}
.nav-warp{
  width:1100px;
  height:35px;
  background:transparent;
  margin:0 auto;
}
.nav{
    height:35px;
    border-bottom: 1px solid #a40011;
    padding-left:180px;
}
.nav li,.nav a{
  height:34px;
  text-align:center;

  position:relative;
  float:left;
}
.nav em {
    padding: 0 13px;
    margin: 7px 17px 0;
    border-radius: 20px;
    color:#fff;
    font-size:10px;
    font-style:normal;
    line-height:20px;
    
    float: left;
}

.nav a:hover em, .nav a.z-slt em{
    background: #9B0909;
}
</style>

