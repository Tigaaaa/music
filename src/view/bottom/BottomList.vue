<template>
  <div class="bottom">
    <div class="content" :class="{up:ifLock||$store.state.listShow}">
      <div class="lock">
        <div class="l"><div class="lock-flag" :class="{inlock:ifLock}" @click="alock" ></div></div>
        <div class="r"></div>
      </div>
      <div class="warp"></div>
      <div class="hand"></div>
      <songPlayer/>
      <playList v-if="$store.state.listShow" @blur="$store.state.listShow=false"/>
    </div>
  </div>
</template>

<script>

import songPlayer from './songPlayer.vue'
import playList from './playList.vue'

export default {
  name: 'BottomList',
  components:{
    songPlayer,
    playList
  },
  data(){
    return{
      ifLock:false
    }
  },
  methods:{
    alock(){
      this.ifLock=!this.ifLock;
    },
  }
}
</script>

<style scoped>
.bottom{
  z-index:1002;
  position:fixed;
  height:0;
  bottom:0;
  width:100%;
}
.content{
  position:absolute;
  width:100%;
  height:53px;
  top:-7px;
  transition:top 0.5s linear;
}
.up{
  top:-53px;
}

.lock{
  width:100%;
  z-index: 11;
  position:relative;
}
.l{
  position:absolute;
  width:52px;
  height:67px;
  top:-14px;
  right:15px;
  background:#333;
}
.r{
  position:absolute;
  width:15px;
  height:54px;
  top:-1px;
  right:0;
  background:#333;
}
.lock-flag{
  width:10px;
  height:10px;
  border-radius:50%;
  background:white;
  opacity:0.5;
  margin:4px auto 0;
}
.lock-flag:hover,.inlock{
  opacity:1;
}

.warp{
  background-color:#333;
  height:53px;
  margin-right:67px;
  box-shadow:0 -3px 3px 0 #333;
}

.hand{
  position:absolute;
  width:100%;
  height:20px;
  top:-10px;
}

.content:hover{
  top:-53px;
  transition:top 0.2s linear;
}
</style>