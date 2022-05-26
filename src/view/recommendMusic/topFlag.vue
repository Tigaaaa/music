<template>
    <div class="top-flag">
    <theTop title="飙升榜" :list="top1"/>
    <theTop title="新歌榜" :list="top2"/>
    <theTop title="原创榜" :list="top3"/>
    </div>
</template>

<script>
import theTop from './aTop.vue'
import {getTopList,getDetail} from '@/utils/api.js'

export default{
    name:'topFlag',
    data(){
        return{
            top1:[1,2,3],
            top2:[1,2,3],
            top3:[1,2,3]
        }
    },
    created(){
        getTopList().then(res=>{
            getDetail(res.data.list[0].id).then(res=>{
                this.top1=res.data.playlist.tracks.slice(0,10);
            })
            .catch(err=>{
                console.log(err);
            });
            getDetail(res.data.list[1].id).then(res=>{
                this.top2=res.data.playlist.tracks.slice(0,10);
            })
            .catch(err=>{
                console.log(err);
            });
            getDetail(res.data.list[2].id).then(res=>{
                this.top3=res.data.playlist.tracks.slice(0,10);
            })
            .catch(err=>{
                console.log(err);
            });
        })
        .catch(err => {
          console.log(err)
        });
    },
    components:{
        theTop
    }
}
</script>

<style scoped>
.top-flag{
    margin-top:20px;
}
.top-flag::after{
    display:block;
    clear:both;
    content:"";
}
</style>