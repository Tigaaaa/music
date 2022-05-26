<template>
  <div id="app">
    <TopList/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <BottomList/>
    <bottomBox/>
  </div>
</template>

<script>
import TopList from './components/TopList.vue'
import BottomList from './view/bottom/BottomList.vue'
import bottomBox from './components/bottomBox.vue'

export default {
  name: 'App',
  components: {
    TopList,
    BottomList,
    bottomBox
  }
}
</script>

<style>
#app{
  width:100%;
  heigth:700px;
}
body{
  background:#f5f5f5;
}
body, html, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd, header, menu, section, p, input, td, th, ins {
    padding: 0;
    margin: 0;
    font-size:12px;
    font-style:normal;
}
input{
  outline:none;
  border:none;
}
a{
  text-decoration: none;
  color:#000;
}
.hov:hover{
  text-decoration:underline;
}
.hid{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

li{
  list-style:none;
}
.a-top{
    width:100%;
    height:5px;
    background:#C20C0C;
}
.all-content{
  width:980px;
  background:#fff;
  border: 1px solid #d3d3d3;
  border-width:0 1px;
  margin:0 auto;
}
.all-content::after{
    clear: both;
    content: ' ';
    display: block;
  }
</style>
