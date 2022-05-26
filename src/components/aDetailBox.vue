<template>
    <div class="warp">
        <img v-lazy="detail.coverImgUrl||detail.picUrl">
        <router-link class="imga" :title="detail.name"
            :to="{
                path:'/detail',
                query:{
                    id:detail.id
                }
            }"></router-link>
        <div class="bottom">
            <a href="#" class="el-icon-video-play"
            @click="play"></a>
            <span class="el-icon-headset"></span>
            <span class="nb">{{detail.playCount|numFil}}</span>
        </div>
        <p class="dec hid">
            <router-link class="hov" :title="detail.name"
                :to="{
                    path:'/detail',
                    query:{
                        id:detail.id
                    }
                }">{{detail.name}}</router-link>
        </p>
    </div>
</template>

<script>
import {getDetail} from '@/utils/api.js'

export default{
    name:'aDetail',
    props:['detail'],
    methods:{
        play(){
         getDetail(this.detail.id).then(res => {
             this.$store.dispatch('playAlbum',res.data.playlist.tracks);
         })
         .catch(err => {
            console.log(err)
        });
        }
    }
}
</script>

<style scoped>
.warp{
    width:140px;
    height:140px;
    position:relative;
}
.imga,img{
    width:100%;
    height:100%;
}
.imga{
    position:absolute;
    left:0;
    top:0;
}

.bottom{
    width:100%;
    height:27px;
    line-height:27px;
    background:#333;
    mix-blend-mode:multiply;
    border-top:1px solid #333;
    
    position:absolute;
    bottom:0;
}
.el-icon-video-play{
    font-size:20px;
    color:#fff;
    margin:3px 3px 0 0;
    float:right;
}
.el-icon-headset{
    font-size:18px;
    color:#fff;
    margin:4px;
    float:left;
}
.nb{
    color:white;
    mix-blend-mode:unset;
    float:left;
}

.dec{
    width:100%;
    font-size:14px;
}
</style>