<template>
    <div class="showlist">
        <div class="listhd">
            <div class="hc">
                <h4>播放列表(
                <span>{{$store.state.showList.length}}</span>)</h4>
            </div>
        </div>
        <div class="listbd">
            <div class="lbd">
                <ul class="list">
                    <li v-for="(song,index) in $store.state.showList" :key="song.id"
                    :class="{isplay:song.id==$store.state.playList[$store.state.index].id}" 
                    @click="play(index)"
                    >
                        <div class="col play-flag"><div class="flag"></div></div>
                        <div class="col song-name hid">{{song.name}}</div>
                        <div class="col other"></div>
                        <div class="col artist-name hid">{{song.ar[0].name}}</div>
                        <div class="col time"></div>
                        <div class="col share"></div>
                    </li>
                </ul>
            </div>
            <div class="cbbd l"></div>
            <div class="rbd">
                <lyricList/>
            </div>
            <div class="cbbd r"></div>
        </div>
    </div>
</template>

<script>
import lyricList from './lyricList.vue'
export default{
    name:'showList',
    methods:{
        play(index){
            this.$store.state.index=index;
        }
    },
    components:{
        lyricList
    }
}
</script>

<style scoped>
.showlist{
    width:986px;
    height:301px;
    background:#333;
    position:absolute;
    bottom:50px;
    left:50%;
    transform:translateX(-50%);
}

.listhd{
    height:41px;
    background:black;
    padding:0 5px;
    position:relative;
}


.hc{
    height:40px;
    position:relative;
}
.hc h4{
    height:39px;
    line-height:39px;
    font-size:14px;
    color:#e2e2e2;

    position:absolute;
    left:25px;
}

.listbd{
    width:976px;
    height:260px;
    padding:0 5px;

    position:absolute;

}

.lbd{
    width:553px;
    height:100%;
    background:#121212;
    overflow:hidden;
    
    position:absolute;
    left:2px;
}

.list{
    width:553px;
    height:260px;
    color:#fff;
    overflow:auto;
}
.list::-webkit-scrollbar{
    width:0;
}
.list::after{
    content:"";
    clear:both;
    display:block;
}

.list li{
    width:100%;
    color:#ccc;
    float:left;
}
 .list li:hover,.list .isplay{
    background:black;
    color:#fff;
}
.list .col{
    height: 28px;
    line-height: 28px;
    padding-left: 10px;
    float:left;
}
.play-flag{
    width:10px;
}
.isplay .flag{
    border-left:10px solid #C20C0C;
    border-top:6px solid transparent;
    border-bottom:6px solid transparent;
    margin-top:8px;
}
.song-name{
    width:256px;
}
.other{
    width:78px;
}
.artist-name{
    width:70px;
}
.time{
    width:35px;
}
.share{
    width:33px;
}

.cbbd{
    width:6px;
    height:100%;
    background:#000;
    
    position:absolute;
}
.l{
    left:555px;
}
.r{
    right:2px;

}
.rbd{
    width:420px;
    height:100%;
    background:#121212;
    
    position:absolute;
    left:560px;
}
</style>