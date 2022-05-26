<template>
  <div class="player">
    <audio id="music"
    ref="audio"
    :src="playUrl"
    @canplay="canplay"
    @timeupdate="timeupdate"
    @ended="ended">
    </audio>
    <div class="button">
        <div class="musicbut el-icon-arrow-left" id="sub" @click="pre"></div>
        <div class="musicbut" id="play" 
        :class="{'el-icon-video-play':!$store.state.isplay,
        'el-icon-video-pause':$store.state.isplay}" 
        @click="play"></div>
        <div class="musicbut el-icon-arrow-right" id="add" @click="next"></div>
    </div>
    <div class="img">
      <img v-if="songInf" :src="songInf.al.picUrl">
      <router-link class="inf" 
      :to="{
        path:'/song',
        query:{
          id:songInf.id
        }
      }"></router-link>
    </div>
    <div class="play">
      <div class="play-inf">
         <router-link v-if="songInf" class="song-name hov hid"
         :to="{
           path:'/song',
           query:{
             id:songInf.id
            }
         }">
         {{songInf.name}}</router-link>
        <a v-if="songInf" class="artist-name hov hid">{{songInf.ar[0].name}}</a>
      </div>
      <div class="play-box">
        <div class="all-bar"  @click="jumpTime">
          <div class="rdy"></div>
          <div id="cur" class="cur" ref="cur">
            <span @mousedown="moveTime"><i></i></span>
          </div>
        </div>
        <span class="time">
        <em>{{playTime|currentTime}}</em>
          /{{timelong|currentTime}}</span>
      </div>
    </div>
    <div class="oper"></div>
    <div class="ctrl">
      <div class="loudBox" v-show="loudShow">
        <div class="loud-bar">
          <div class="loud-h" ref="loud" @mousedown="moveLoud"><span><i></i></span></div>
        </div>
      </div>
      <div class="ctbt" :class="{'el-icon-message-solid':playLoud>0,'el-icon-close-notification':playLoud==0}" @click="loudShow=!loudShow"></div>
      <div class="ctbt" 
      :class="{'el-icon-refresh':$store.state.playStyle==0,
      'el-icon-refresh-right':$store.state.playStyle==1,
      'el-icon-magic-stick':$store.state.playStyle==2}"
      @click="changStyle"></div>
      <div class="ctbt el-icon-s-unfold" @click="showList"></div>
    </div>
  </div>
</template>

<script>
import {getSongUrl,getSongLy} from '@/utils/api.js'
import {analysLyric} from '@/components/founc.js'

export default {
  name: 'songPlayer',
  data(){
    return{
      playUrl:"",
      songInf:"",
      playTime:0,
      timelong:0,
      loudShow:false,
      playLoud:0.3
    }
  },
  methods:{
    canplay(e){
      this.timelong=e.target.duration;
      e.target.volume=this.playLoud;
      this.$refs.loud.style.height=this.playLoud*101+'px';
    },
    timeupdate(e){
      this.$store.state.playTime=e.target.currentTime;
      this.playTime=e.target.currentTime;
      let bar=this.$refs.cur;
      let barlong=this.playTime*100/this.timelong;
      bar.style.width=barlong+'%';
    },
    ended(){
      if(this.$store.state.playStyle==1){
        this.$refs.audio.currentTime=0;
        this.$refs.audio.play();
      }
      else
        this.$store.dispatch('next');
    },
    play(){
      if(this.songInf){
        this.$refs.audio.paused?this.$refs.audio.play():this.$refs.audio.pause();
        this.$store.state.isplay=!this.$store.state.isplay;
      }
    },
    pre(){
      this.$store.dispatch('pre');
    },
    next(){
      this.$store.dispatch('next');
    },
    jumpTime(e){
      let cur=this.$refs.cur;
      cur.style.width=e.offsetX+'px';
      this.$refs.audio.currentTime=e.offsetX/466*this.timelong;
    },
    moveTime(e){
      let cur=this.$refs.cur;
      let x;
       let subx=e.clientX-cur.offsetWidth;
        document.onmousemove=(e)=>{
            x=e.clientX-subx;
            if(x>466)
              x=466;
            cur.style.width=x+'px';
        }
        document.onmouseup=()=>{
          this.$refs.audio.currentTime=x/466*this.timelong;
          document.onmousemove=null;
          document.onmouseup=null;
        }
    },
    moveLoud(e){
      let loud=this.$refs.loud;
      let y;
       let suby=-e.clientY-loud.offsetHeight;
        document.onmousemove=(e)=>{
            y=-e.clientY-suby;
            if(y>101)
              y=101;
            loud.style.height=y+'px';
        };
        document.onmouseup=()=>{
          let loud=y/101<0.05?0:y/101;
          this.$refs.audio.volume=loud;
          this.playLoud=loud;
          document.onmousemove=null;
          document.onmouseup=null;
        };
    },
    changStyle(){
      this.$store.dispatch('changStyle');
    },
    showList(){
      this.$store.state.listShow=!this.$store.state.listShow;
    }
  },

  watch:{
    '$store.state.index'(newIndex){
        if(this.$refs.audio){
          this.$refs.audio.autoplay="autoplay";
          this.songInf=this.$store.state.playList[newIndex];
          let id=this.songInf.id;
          getSongUrl(id).then(res => {
              this.playUrl=res.data.data[0].url;
            })
            .catch(err => {
              console.log(err)
          });
          getSongLy(id).then(res => {
            this.$store.state.lyric=analysLyric(res.data.lrc.lyric)
        })
        .catch(err => {
          console.log(err)
        });
      }
    },
    '$store.state.playTime'(playTime){
      this.$refs.audio.currentTime=playTime;
    }
  },

}
</script>

<style scoped>
.player{
  width:980px;
  height:47px;
  position:absolute;
  top:6px;
  left:50%;
  transform:translateX(-50%);
}

.button{
  width:137px;
  height:42px;
  padding:6px 0 0 0;
  float:left;
}
.musicbut{
  float:left;
  color:#fff;
}
.el-icon-video-play,.el-icon-video-pause{
  font-size:36px;
  margin-right:8px;
}
.el-icon-arrow-left,.el-icon-arrow-right{
  font-size:28px;
  margin:4px 8px 0 0;
}


.img{
  width:34px;
  height:34px;
  background:black;
  margin:6px 15px 0 0;
  position:relative;
  float:left;
}
.img img,.inf{
  position:absolute;
  d$store.state.isplay:block;
  left:0;
  top:0;
  width:34px;
  height:34px;
  border-radius:5px;
}

.play{
    width:581px;
    float:left;
}

.play-inf{
    height:28px;
    line-height:28px;
}
.song-name{
    color:#e8e8e8;
}
.artist-name{
    margin-left:15px;
    color:#9b9b9b;
}

.play-box{
    position:relative;
    width:466px;
    height:9px;
}

.all-bar{
  width:466px;
  height:9px;
  background:black;
  border-radius:5px;
}
.rdy{

}
.cur{
  width:0;
  height:9px;
  background:#C20C0C;
  position:relative;
}
.cur span{
  width:18px;
  height:18px;
  background:#fff;
  border-radius:50%;
  position:absolute;
  right:-9px;
  top:50%;
  transform:translateY(-50%);
}
.cur i{
  d$store.state.isplay:block;
  width:8px;
  height:8px;
  background:#C20C0C;
  border-radius:50%;
  margin:5px auto;
}

.time{
  position: absolute;
  top: -3px;
  right: -84px;
  color: #797979;
  text-shadow: 0 1px 0 #121212;
}
.time em{
  color:#a1a1a1;
  font-style:normal;
}

.oper{
  width:87px;
  height:36px;
  float:left;
}

.ctrl{
  position:relative;
  width:113px;
  height:36px;
  padding-left:13px;
  float:left;
}

.ctbt{
  margin:11px 3px 0 0;
  float:left;
  font-size:25px;
  color:#A9A9A9;
}

.loudBox{
  width:32px;
  height:113px;
  background:black;

  position:absolute;
  top:-116px;
  clear:both;
}
.loud-bar{
  width:4px;
  height:101px;
  border-radius:2px;
  background:#333;
  margin:auto;
  
  position:absolute;
  left:50%;
  bottom:6px;
  transform:translateX(-50%);
}
.loud-h{
  width:4px;
  height:50%;
  background:#C20C0C;

  position:absolute;
  bottom:0;

}
.loud-h span{
  width:15px;
  height:15px;
  background:#fff;
  border-radius:50%;
  
  position:absolute;
  top:-5px;
  left:50%;
  transform:translateX(-50%);
}
.loud-h span i{
  d$store.state.isplay:block;
  width:5px;
  height:5px;
  background:#C20C0C;
  border-radius:50%;
  margin:5px auto; 
}
</style>