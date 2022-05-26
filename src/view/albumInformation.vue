<template>
    <div class="all-content">
        <div class="left-warp">
            <inform :song="album" :type="2" @play="play"/>
            <div class="songList">
              <tabtop :more="false" :theTitle="'包含歌曲列表('+song.length+')'"/>
              <div class="bd"><songList :songList="song"/></div>
            </div>
            <div class="comment-box">
              <comList :id="$route.query.id" :type="2"/>
            </div>
        </div>
        <div class="right-warp">
        </div>
    </div>
</template>

<script>
import {getAlbum} from '@/utils/api.js'
import inform from '../components/inform.vue'
import songList from '../components/songList.vue'
import tabtop from '../components/table-top.vue'
import comList from '../components/commentList.vue'

export default {
  name: 'albumInformation',
  data(){
    return{
      album:"",
      song:""
    }
  },
  methods:{
    play(){
      this.$store.dispatch('playAlbum',this.song);
    }
  },
  created(){
    getAlbum(this.$route.query.id).then(res => {
      this.album=res.data.album;
      this.song=res.data.songs;
      this.album.description=this.album.description.split('\n\n');
      console.log(this.song);

      let date=new Date(this.album.publishTime);
      let y=date.getFullYear();
      let m=date.getMonth()+1;
      m=m<10?'0'+m:m;
      let d=date.getDate();
      d=d<10?'0'+d:d;
      this.album.publishTime=y+'-'+m+'-'+d;
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