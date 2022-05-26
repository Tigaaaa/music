<template>
    <div>
        <div class="a-top"></div>
        <div class="all-content">
            <div class="selectIn">
                <div class="input">
                    <input type="text" v-model="keyword"/>
                </div>
                <router-link class="el-icon-search" :to="{
                    path:'/search',
                    query:{
                            keyword:keyword,
                             type:1
                            }
                        }">
                </router-link>
            </div>
            <div class="search">
                <div class="type">搜索"{{$route.query.keyword}}"，找到 
                <em class="num">{{songNum}}</em> 首单曲
                </div>
                <ul class="top-list">
                    <li class="tl" v-for="item of topList" :key="item.type" 
                    :class="{act:item.type==$route.query.type}"
                    @click="clic(item.type)"
                    >
                     {{item.tit}}</li>
                </ul>
                <div class="list-box">
                    <songList v-if="$route.query.type==1" :songList="selectList.songs"/>
                    <ul class="album-ul" v-if="$route.query.type==10">
                        <li class="album" v-for="a in selectList.albums" :key="a">
                            <albumBox :album="a" :width="'130px'" :height="'130px'"/>
                        </li>
                    </ul>
                    <detailList v-if="$route.query.type==100" :detailList="selectList.artists"/>
                    <detailList v-if="$route.query.type==1000" :detailList="selectList.playlists"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getSelect} from '@/utils/api.js'
import detailList from '@/components/detailList.vue'
import songList from '@/components/songList.vue'
import albumBox from '@/components/albumBox.vue'

export default{
    name:'theSearch',
    components:{
        detailList,
        songList,
        albumBox
    },
    data(){
        return{
            keyword:"",
            topList:[{type:1,tit:"单曲"},
                    {type:10,tit:"专辑"},
                    {type:100,tit:"歌手"},
                    {type:1000,tit:"歌单"},
                ],
            selectList:[{}],
            songNum:20
        }
    },
    methods:{
        clic(item){
            this.$router.push({
                query:{
                    ...this.$route.query,
                    keyword:this.keyword,
                    type:item
                }
            })
        },
        updataSelect(){
         this.keyword=this.$route.query.keyword;
         getSelect(this.$route.query.keyword,this.$route.query.type,this.songNum).then(res => {
         this.selectList=res.data.result;
         console.log(this.selectList);
        })
        .catch(err => {
          console.log(err)
        });
        }
    },
    created(){
        this.updataSelect();
    },
    watch:{
    $route:{
        deep:true,
        handler(){
            this.updataSelect()}
        }
    }
}

</script>

<style scoped>
.all-content{
  width:900px;
  padding:40px;
}
.selectIn{
    width:420px;
    height:40px;
    border:1px solid #ccc;
    margin:0 auto;
    border-radius:5px;
}
.input{
    width:80%;
    height:40px;
    box-shadow:-3px 3px 5px #ccc inset;
    float:left;
}
input{
    margin:12px 0 0 20px;
}
.selectIn a{
    width:20%;
    height:40px;
    font-size:20px;
    text-align:center;
    line-height:40px;
    float:right;
}


.search{
    width:100%;
    margin:28px 0 17px 0;
    color:#999;
}
.num{
    font-style:normal;
    color:#c20c0c;
}

.top-list{
    width:100%;
    height:39px;
    border-left:1px solid #333;
    border-right:1px solid #333;
}
.tl{
    width:25%;
    height:39px;
    line-height:39px;
    text-align:center;
    font-size:14px;
    color:#333;
    background:#f2f2f2;
    border-top:2px solid #333;
    border-bottom:1px solid #333;

    float:left;
}
.tl:hover,.act{
    border-top: 2px solid #c20c0c;
}
.act{
    background:#fff;
    border-bottom: 1px solid #fff;
}

.list-box{
    width:100%;
}

.album-ul{
    margin-top:20px;
}
.album-ul::after{
    clear:both;
    display:block;
    content:"";
}
.album{
    height:178px;
    float:left;
    margin:0 0 30px 40px;
}
</style>