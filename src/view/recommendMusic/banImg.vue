<template>
 <div class="ban" :style="{backgroundImage:'url('+banners[imgIndex].imageUrl+')'}">
      <div class="warp">
        <div class="ban-img" >
          <a hidefocus="true" style="overflow: hidden" href="/#" target="">
            <transition name="img-new" appear>
              <img v-if="ifshow" v-lazy="banners[imgIndex].imageUrl" >
            </transition>
            <transition name="img-old">
              <img v-if="!ifshow" v-lazy="banners[imgIndex].imageUrl" >
            </transition>
          </a>
        </div>
        <a hidefocus="true" href="/#" class="l-bot" @click="imgBack"> </a>
        <a hidefocus="true" href="/#" class="r-bot" @click="imgGo"> </a>
        <div class="index-bot">
        <a v-for="(im,index) in banners" hidefocus="true" href="/#" :key="index" :class="{'z-slt':index==imgIndex}" @click="newImg(index)"> </a>
        </div>
      </div>
    </div>
</template>

<script>
import {getBanner} from '@/utils/api.js'

export default {
  name: 'imgShow',
  data(){
    return{
      timer:"",
      imgIndex:0,
      ifshow:true,
      banners:[{imageUrl:""}]
    }
  },
  methods:{
  newTimer(){//重置轮播图定时器
    window.clearInterval(this.timer);
    this.timer=window.setInterval(()=>{
      this.ifshow=!this.ifshow;
      this.$nextTick(function(){
      this.imgIndex++;
      if(this.imgIndex>=this.banners.length)
        this.imgIndex=0;
      this.ifshow=!this.ifshow;
      })
      },5000);
  },
  imgGo(){//轮播图前进
    this.newTimer();
    this.imgIndex++;
    if(this.imgIndex>=this.banners.length)
        this.imgIndex=0;
  },
  imgBack(){//轮播图后退
    this.newTimer();
    this.imgIndex--;
    if(this.imgIndex<0)
      this.imgIndex=this.banners.length-1;
  },
  newImg(id){
    this.imgIndex=id;
  }
},
  created(){
        getBanner().then(res => {
          this.banners=res.data.banners;
        })
        .catch(err => {
          console.log(err)
        });
    this.newTimer();
    },
    beforeDestory(){
      window.clearInterval(this.timer);
    }
}
</script>

<style scoped>
.ban{
  width:100%;
  height:285px;
  background:#ccc;
  background-size:6000px;
  background-position:center center;
}
.warp{
  width:980px;
  height:285px;
  margin:auto;
  position:relative;
}

.ban img{
  width:730px;
  height:285px;
  position:absolute;
  left:0;
}
.l-bot ,.r-bot,.index-bot{
  opacity: 70%;
}
.l-bot:hover ,.r-bot:hover,.index-bot:hover,.ban .z-slt{
  opacity:1;
}
.l-bot ,.r-bot{
  position:absolute;
  top:50%;
  transform:translateX(-50%);
  border-top:20px solid transparent;
  border-bottom:20px solid transparent;
}
.l-bot{
    border-right:40px solid white;
    left:-40px;
}
.r-bot{
    border-left:40px solid white;
    right:-80px;
}

.index-bot{
  width:730px;
  text-align:center;

  position:absolute;
  bottom:10px;
  left:0;
}
.index-bot a{
  display:inline-block;
  width: 8px;
  height: 8px;
  border-radius:50%;
  margin: 0 10px;
  background-color: white;
}
.index-bot a:hover,.index-bot .z-slt{
  background:#C20C0C;
}

.img-new-enter-active{
	animation:img-come 1s linear;
}
.img-old-leave-active{
	animation:img-come 1s linear reverse;
}

@keyframes img-come{
	from{
	opacity:0;	
	}
	to{
	opacity:1;
	}	
}
</style>