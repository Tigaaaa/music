<template>
    <div class="top">
        <a href="" class="big-title">{{theTitle}}</a>
        <div class="tab" v-if="nbo">
            <a href="\" class="c6">华语</a>
            <span class="line">|</span>
            <a href="" class="c6">流行</a>
            <span class="line">|</span>
            <a href="" class="c6">摇滚</a>
            <span class="line">|</span>
            <a href="" class="c6">民谣</a>
            <span class="line">|</span>
            <a href="" class="c6">电子</a>
          </div>
        <span class="more" v-if="more"><a href="/discover/playlist/" class="c6">更多</a><i class="cor">&nbsp;</i></span>
    </div>
</template>

<script>
export default {
  name: 'tabTop',
  props:{
    theTitle:{
      type:String,
      required:true
    },
    nbo:{
      type:Boolean,
      default:false
    },
    more:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
.top{
  width:100%;
  height:35px;
  border-bottom:2px solid #C10D0C;;
}
.big-title{
  font-size: 20px;
  font-weight: normal;
  line-height: 28px;
  color:black;

  float: left;
}
.tab{
  margin:7px 0 0 20px;
  float:left;

}
.line{
  margin:0 10px;
}
.c6,.line{
  color:#666;
}
.more{
  margin-top:9px;
  float:right;
}
</style>

