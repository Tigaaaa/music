<template>
    <div class="all-content">
        <div class="left-warp">
            <inform :song="song" :ly="ly" :type="1"/>
            <div class="comment-box">
              <comList :id="$route.query.id" :type="1"/>
            </div>
        </div>
        <div class="right-warp">
        </div>
    </div>
</template>

<script>
import {analysLyric} from '@/components/founc.js'
import {getSongInf,getSongLy} from '@/utils/api.js'
import inform from '@/components/inform.vue'
import comList from '@/components/commentList.vue'

export default {
  name: 'songInformation',
  data(){
    return{
      song:"",
      ly:"",
    }
  },
  created(){
    getSongInf(this.$route.query.id).then(res => {
      this.song=res.data.songs[0];
      })
      .catch(err => {
        console.log(err)
        });

      getSongLy(this.$route.query.id).then(res => {
        this.ly=res.data;
        this.ly.lrc.lyric=analysLyric(this.ly.lrc.lyric);
        })
        .catch(err => {
          console.log(err)
        });
  },
  components:{
    inform,
    comList
    },
}
</script>

<style scoped>
.left-warp{
  float:left;
  width:640px;
  padding: 47px 30px 40px 39px;
  background:white;
}
.right-warp{
  width:270px;
  height:1000px;
  background:white;
  border-left:1px solid  #d3d3d3;
  float:right;
}

.comment-box{
    width:100%;
    height:100px;
    margin-top:40px;
}

</style>