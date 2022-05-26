<template>
    <div class="inf">
        <div class="song-inf">
            <div :class="{'img-play':type!=3,'img-detail':type==3}">
                <img v-if="type==1" v-lazy="song.al.picUrl">
                <img v-if="type==2" v-lazy="song.picUrl">
                <img v-if="type==3" v-lazy="song.coverImgUrl">
            </div>
            <div class="r-inf">
                <div class="hd">
                    <em>{{song.name}}</em>
                    <div v-if="type==1">{{song.alia[0]}}</div>
                    <div v-if="type==2">{{song.alias[0]}}</div>
                </div>
                <p v-if="type!=3" class="ap">歌手：
                    <a v-if="type==1" a>{{song.ar[0].name}}</a>
                    <a v-if="type==2" a>{{song.artist.name}}</a>
                </p>
                <p v-if="type==2" class="ap">发行时间:{{song.publishTime}}</p>
                <p v-if="type==1" class="ap">所属专辑：
                    <router-link class="hov" 
                    :to="{
                        path:'/album',
                        query:{
                            id:song.al.id
                        }
                    }">
                    {{song.al.name}}</router-link>
                </p>
                <div v-if="type==3" class="create-inf">
                    <a class="creator-hd"><img :src="song.creator.backgroundUrl"></a>
                    <a class="creator-nm hov">{{song.creator.nickname}}</a>
                    <p class="create-time">{{song.createTime}} 创建</p>
                </div>
                <div v-if="type==3" class="tags">
                    <b>标签：</b>
                    <a v-for="t in song.tags" :key="t"><p>{{t}}</p></a>
                </div>
                <div v-if="type==3" class="det-inf">
                    介绍：<p v-for="(a,index) in song.description" :key="index">{{a}}</p>
                </div>
                <div class="but">
                    <button class="play" @click="play()">播放</button>
                    <button class="play other-but"></button>
                    <button class="other-but">分享</button>
                    <button class="other-but">收藏</button>
                    <button class="other-but">下载</button>
                    <button class="other-but">评论</button>
                </div>
                <div v-if="type==1" class="lyric">
                <p v-for="(ly,index) in ly.lrc.lyric" :key="index">{{ly.text}}</p></div>
            </div>
        </div>
        <div v-if="type==1" class="other-inf">
            <p class="ap">报错</p>
            <p class="ap" v-if="ly.lyricUser">贡献滚动歌词:<a>{{ly.lyricUser.nickname}}</a></p>
        </div>
        <div v-if="type==2" class="albumInf">
            <h3>专辑介绍</h3>
            <p v-for="(d,index) in song.description" :key="index">{{d}}</p>
        </div>
    </div>
</template>

<script>
export default{
    name:"inForm",
    props:{
        song:{
            type:Object,
            required:true
        },
        ly:{
            type:Object
        },
        type:{
            type:Number,
            required:true
        }
    },
    methods:{
        play(){
            if(this.type==2||this.type==3){
                this.$emit('play');
            }
            else
                this.$store.dispatch('play',this.song);
        }
    },

}
</script>

<style scoped>
.song-inf{
    width:100%;
}
.song-inf::after,.hd::after,.create-inf::after,.tags::after{
    display:block;
    clear:both;
    content:"";
}

.img-play{
    margin-right:-226px;
    border-radius:50%;
    float:left;
    background:#000;
    padding:34px;
}
.img-play img{
    width:130px;
    height:130px;
    border-radius:50%;
}
.img-detail{
    margin-right:-226px;
    float:left;
    background:#fff;
    padding:3px;
    border:1px solid #ccc;
}
.img-detail img{
    width:200px;
    height:200px;
}

.r-inf{
    width:414px;
    float:right;
}

.hd{
    width:414px;
    line-height:24px;
    margin-bottom:12px;
}
.hd em{
    font-style:normal;
    font-size:24px;
    color:#333;
}
.hd div{
    font-style:normal;
    font-size:14px;
    color:#aeaeae;
    margin:1px 0 5px;
}

.ap{
    width:414px;
    height:16px;
    margin:10px 0;
    font-size:12px;
    color:#666;
}
.ap a,.creator-nm{
    color:#0c73c2;
}
.ap a:hover,.creator-nm:hover{
    text-decoration:underline;
}
.create-inf{
    margin-bottom:20px;
    line-height:35px;
}

.creator-hd{
    float: left;
    width: 35px;
    height: 35px;
    margin-right:10px;
}
.creator-hd img{
    float: left;
    width: 35px;
    height: 35px;
}
.creator-nm{
    float:left;
}
.create-time{
    margin-left: 15px;
    color: #999;
    float:left;
}
.tags{
    margin: 25px 0 5px;
    line-height: 22px;
}
.tags b{
    font-weight: normal;
    color: #666;
    float:left;
}
.tags a{
    height:22px;
    line-height:22px;
    color: #777;
    margin: 0px 10px 3px 0;
    padding: 0 13px;
    border-radius:30%;
    border:1px solid #ccc;
    background:#fff;
    float: left;
}

.det-inf{
    height:150px;
    overflow:auto;
    margin-top:4px;
    line-height:18px;
    color: #666;
}
.det-inf::-webkit-scrollbar{
    width:0;
}


.but{
    margin:0 10px 25px 0;
}
.but button{
    height:31px;
}
.play{
    background:#C20C0C;
}
.other-but{
    margin-right:6px;
}
.lyric{
    height:150px;
    overflow:auto;
    margin-top:13px;
    line-height:23px;
}
.lyric::-webkit-scrollbar{
    width:0;
}

.other-inf{
    width:640px;
    height:60px;
    margin-top:48px;
    text-align:right;
    line-height:30px;
}
.other-inf .ap{
    width:100%;
    height:30px;
}
.albumInf{
    margin-top:20px;
}
.albumInf p{
    color:#666;
    margin-top:4px;
    line-height:24px;
    text-indent: 2em;
}
</style>