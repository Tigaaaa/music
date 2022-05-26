<template>
    <div class="warp" :style="{width:width,height:height}">
        <img v-lazy="album.picUrl">
        <router-link class="imga" :title="album.name"
            :to="{
                path:'/album',
                query:{
                    id:album.id
                }
            }"></router-link>
            <a href="#" class="play el-icon-video-play"
            @click="play"></a>
        <p class="hid">
            <router-link class="hov" 
                :to="{
                    path:'/album',
                    query:{
                        id:album.id
                    }
                }">
            {{album.name}}</router-link>
        </p>
        <p class="hid">
            <a class="name" href="#">{{album.artist.name}}</a>
        </p>
    </div>
</template>

<script>
import {getAlbum} from '@/utils/api.js'

export default{
    name:'albumBox',
    props:['album','width','height'],
    methods:{
        play(){
         getAlbum(this.album.id).then(res => {
             this.$store.dispatch('playAlbum',res.data.songs);
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
    width:100px;
    height:100px;
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
.play{
    font-size:25px;
    color:#fff;
    opacity:0;
    position:absolute;
    right:10px;
    bottom:5px;
}
.warp:hover .play{
    opacity:0.8;
}

p{
    width:90%;
}
.name{
    color:#666;
}
</style>