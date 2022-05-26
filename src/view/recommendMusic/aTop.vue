<template>
    <div class="the-top">
        <div class="hd"><h1>{{title}}</h1></div>
        <ul class="bd">
            <li v-for="(l,index) in list" :key="l" :class="{col1:index%2==0}">
                <span class="ahd" :class="{redh:index<3}">{{index+1}}</span>
                <router-link class="abd hid hov"
                :to="{
                    path:'/song',
                    query:{
                        id:l.id
                    }
                }"
                >{{l.name}}</router-link>
                <div class="play-box">
                <a class="el-icon-video-play" @click="play(l.id)"></a></div>
            </li>
            <li class="col1"><a class="more hov">查看全部></a></li>
        </ul>
    </div>
</template>

<script>
export default{
    name:'aTop',
    props:['title','list'],
    methods:{
        play(id){
            this.$store.dispatch('play',id);
        }
    }
}
</script>

<style scoped>
.the-top{
    width:225px;
    background:#f5f5f5;
    border:1px solid #d3d3d3;
    float:left;
}
.hd{
    height:100px;
    line-height:100px;
    text-align:center;
}
h1{
    font-size:20px;
}
.bd li{
    height:32px;
    line-height:32px;
}
.col1{
    background:#e8e8e8;
}

.ahd{
    height: 32px;
    width:35px;
    text-align:center;
    font-size:15px;
    margin-left:15px;
    float:left;
}
.redh{
    color:#c10d0c;
}
.abd{
    height:32px;
    width:135px;
    font-size:12px;
    margin-left:5px;
    float:left;
}
.play-box{
    width:20px;
    height:32px;
    line-height:32px;
    text-align:center;
    float:right;
    
    opacity:0;
}
.el-icon-video-play{
    font-size:15px;
    color:#bbb;
}
.bd li:hover .play-box{
    opacity:1;
}

.more{
    float:right;
    margin-right:15px;
}
</style>