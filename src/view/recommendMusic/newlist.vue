<template>
    <div class="new-box">
        <div class="list">
            <a class="el-icon-arrow-left" @click="indexSub"></a>
            <div class="list-box">
                <ul class="alist no1" style="left:0px">
                    <li v-for="a in music1" :key="a">
                        <albumBox :album="a" :width="'100px'" :height="'100px'"/>
                    </li>
                </ul>
                <ul class="alist no2" style="left:-648px">
                    <li v-for="a in music2" :key="a">
                        <albumBox :album="a" :width="'100px'" :height="'100px'"/>
                    </li>
                </ul>
                <ul class="alist no1" style="left:-648px">
                    <li v-for="a in music1" :key="a">
                        <albumBox :album="a" :width="'100px'" :height="'100px'"/>
                    </li>
                </ul>
                <ul class="alist no2" style="left:648px">
                    <li v-for="a in music2" :key="a">
                        <albumBox :album="a" :width="'100px'" :height="'100px'"/>
                    </li>
                </ul>
            </div>
            <a class="el-icon-arrow-right" @click="indexAdd"></a>
        </div>
    </div>
</template>

<script>
import albumBox from '@/components/albumBox.vue'
import {getNewList} from '@/utils/api.js'

export default {
  name: 'newList',
  data(){
      return{
          music1:[],
          music2:[],
          left:[0,-648,-648,648],
          aindex:0
      }
  },
  methods:{
    indexAdd(){
        this.aindex=++this.aindex%4;
        let list=Array.from(document.getElementsByClassName("alist"));
        list.forEach((l,index)=>{
            if(l.style.left=='0px'||l.style.left=='648px'){
                l.style.transition='left 0.8s ease-out';
            }
            l.style.left=this.left[(this.aindex+index)%4]+'px';
        });
        window.setTimeout(()=>{
            list.forEach(l=>{l.style.transition='none 0s ease 0s'})
        },800);
        },
    indexSub(){
        this.aindex=(--this.aindex+4)%4;
        let list=Array.from(document.getElementsByClassName("alist"));
        list.forEach((l,index)=>{
           l.style.left=this.left[(this.aindex+index)%4]+'px';
            if(l.style.left=='0px'||l.style.left=='648px'){
                l.style.transition='left 0.8s ease-out';
            }
        });
        window.setTimeout(()=>{
            list.forEach(l=>{l.style.transition='none 0s ease 0s'})
        },800);
    }
  },
  created(){
      getNewList(5,0).then(res => {
          this.music1=res.data.weekData.slice(0,5);
          this.music2=res.data.weekData.slice(5,10);
        })
        .catch(err => {
          console.log(err)
        });
  },
  components:{
      albumBox
  }
}
</script>

<style scoped>
.new-box{
    width:687px;
    height:186px;
    margin:20px 0 37px 0;

    position:relative;
}
.list{
    width:669px;
    height:184px;
    padding-left:16px;
    background:#f5f5f5;
    border: 1px solid #d3d3d3;
}
.el-icon-arrow-left,.el-icon-arrow-right{
    top:71px;
    font-size:15px;
    position:absolute;
}
.el-icon-arrow-left{
    left:4px;
}
.list-box{
    width:645px;
    height:180px;
    overflow:hidden;
    float:left;

    position:relative;
}
.alist{
    width:645px;
    height:150px;
    margin-top:28px;
    position:absolute;
}
.no1,.no2{
    background:#f5f5f5;
}
.no1 li,.no2 li{
    width:118px;
    height:110px;
    padding-left:11px;
    float:left;
}

</style>

