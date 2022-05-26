<template>
    <ul class="list-content">
        <li v-for="a in detailList" :key="a.id">
            <aDetailBox :detail="a"/>
        </li>
    </ul>
</template>

<script>
import aDetailBox from './aDetailBox.vue'

export default {
  name: 'detailList',
  props:['detailList'],
  components:{
      aDetailBox
  }
}
</script>

<style scoped>
.list-content{
  margin:20px 0 0 -42px;
}
.list-content::after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.list-content li{
  width:140px;
  height:204px;
  padding:0 0 30px 42px;

  float:left;
}

</style>

