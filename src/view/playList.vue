<template>
    <div class="all-content">
        <tabTop :theTitle="chat"/>
        <detailList :detailList="detailList"/>
    </div>
</template>

<script>
import tabTop from '@/components/table-top.vue'
import detailList from '@/components/detailList.vue'
export default {
  name: 'songSheet',
  data(){
      return{
          chat:"全部",
          detailList:[1,2,3,4,5]
      }
  },
  components:{
      tabTop,
      detailList
  }
}
</script>

<style scoped>
.all-content{
  width:900px;
  padding:40px;
}


</style>