<template>
    <ul class="list">
        <li class="alist" v-for="(song,index) in songList" :key="song.id" :class="{col:index%2!=0}">
            <div class="el-icon-video-play" title="播放" @click="play(song.id)"></div>
            <div class="text">
                <router-link class="song-name hov" 
                :to="{
                    path:'/song',
                    query:{
                        id:song.id
                    }
                }">
                    {{song.name}}</router-link>
                <span v-if="song.alias" >{{song.alias[0]?'-'+song.alias[0]:''}}</span>
                <span v-if="song.tns" >{{song.tns[0]?'-('+song.tns[0]+')':''}}</span>
            </div>
            <div class="other"></div>
            <div v-if="song.artists" class="artist hov hid"><span>{{song.artists[0].name}}</span></div>
            <div v-if="song.ar" class="artist hov hid"><span>{{song.ar[0].name}}</span></div>
            
            <div v-if="song.album" class="album hov hid">
                <router-link 
                :to="{
                    path:'/album',
                    query:{
                        id:song.album.id
                    }
                }">{{song.album.name}}</router-link>
            </div>
        </li>
    </ul>
</template>

<script>
import {getSongInf} from '@/utils/api.js'
export default{
    name:'theSearch',
    props:['songList'],
    methods:{
        play(id){
            getSongInf(id).then(res => {
                this.$store.dispatch('play',res.data.songs[0]);
                console.log(this.$store.state.showList);
            })
            .catch(err => {
                console.log(err)
            });           
        }
    },
}
</script>

<style scoped>
.list{
    margin-top:20px;
}
.alist{
    padding:10px 10px 8px 18px;
    color:#333;
    border: 1px solid #fff;
}
.alist div{
    float:left;
    margin-right:5px;
}
.el-icon-video-play{
    font-size:20px;
    color:#A9A9A9;
}
.alist::after{
    content:"";
    clear:both;
    display: block;
}
.col{
    background:#f7f7f7;
    border-color:#f7f7f7;
}
.alist:hover{
    border: 1px solid #e1e1e1;
    background: #f2f2f2;
}

.text{
    height:20px;
    width:370px;
}

.text span{
    color:#aeaeae;
}
.other{
    width:96px;
    height:16px;
}
.artist{
    width:15%;
    height:16px;
}
.album{
    width:18%;
    height:16px;
}
</style>