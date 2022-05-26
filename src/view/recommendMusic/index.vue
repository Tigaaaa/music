<template>
  <div>
  <imgShow/>
    <div class="all-content">
      <div class="left-warp">
        <div class="l-content rmtj">
          <tabTop :nbo="true" theTitle="热门推荐" />
          <detailList :detailList="hotList"/>
        </div>
        <div class="l-content xdsj">
          <tabTop :more="false" theTitle="新碟上架" />
          <newlist/>
        </div>
        <div class="l-content bd">
          <tabTop theTitle="榜单"/>
          <topFlag/>
        </div>
      </div>
      <div class="right-warp">
      </div>
    </div>
  </div>
</template>

<script>
import {getHotList} from '@/utils/api.js'
import imgShow from './banImg.vue'
import tabTop from '@/components/table-top.vue'
import detailList from '@/components/detailList.vue'
import newlist from './newlist.vue'
import topFlag from './topFlag.vue'


export default {
  name: 'recommendMusic',
  components:{
    imgShow,
    tabTop,
    detailList,
    newlist,
    topFlag
  },
  data(){
    return{
      hotList:[],
    }
  },
  created(){
        getHotList().then(res => {
          this.hotList=res.data.playlists;
          console.log(this.hotList);
        })
        .catch(err => {
          console.log(err)
        });
  }
}
</script>

<style scoped>
.left-warp{
  float:left;
  width:689px;
  padding: 20px 20px 40px;
  background:white;
  border-right:1px solid #d3d3d3;
}
.right-warp{
  width:250px;
  height:100px;
  background:#ccc;
  float:right;
}

.l-content{
  width:100%;
}

</style>

