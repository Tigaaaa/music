<template>
    <div class="all-content">
        <div class="left-warp">
            <inform :song="detail" :type="3" @play="play"/>
            <div class="songList">
              <tabtop :more="false" :theTitle="'包含歌曲列表('+song.length+')'"/>
              <div class="bd"><songList :songList="song"/></div>
            </div>
            <div class="comment-box">
              <comList :id="$route.query.id" :type="3"/>
            </div>
        </div>
        <div class="right-warp">
        </div>
    </div>
</template>

<script>
import {getDetail} from '@/utils/api.js'
import inform from '@/components/inform.vue'
import songList from '@/components/songList.vue'
import tabtop from '@/components/table-top.vue'
import comList from '@/components/commentList.vue'

export default {
  name: 'detailInformation',
  data(){
    return{
      detail:"",
      song:""
    }
  },
  methods:{
    play(){
      this.$store.dispatch('playAlbum',this.song);
    }
  },
  created(){
    getDetail(this.$route.query.id).then(res => {
      this.detail=res.data.playlist;
      this.song=res.data.playlist.tracks;
      this.detail.description=this.detail.description.split('\n\n');
      console.log(this.detail);
      console.log(this.song);

      let date=new Date(this.detail.createTime);
      let y=date.getFullYear();
      let m=date.getMonth()+1;
      m=m<10?'0'+m:m;
      let d=date.getDate();
      d=d<10?'0'+d:d;
      this.detail.createTime=y+'-'+m+'-'+d;
    })
    .catch(err => {
      console.log(err)
    });
  },
  components:{
    inform,
    comList,
    songList,
    tabtop
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

.songList{
  margin-top: 27px;
}

.comment-box{
    width:100%;
    height:100px;
    margin-top:40px;
}

</style>