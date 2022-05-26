<template>
    <div class="lyric-box" ref="lycb" >
        <p class="lyric" v-for="(ly,index) in $store.state.lyric" :key="index"
        :class="{'lyric-time':index==lyindex}"
        @mousedown="moveLyr"
        >{{ly.text||"\n"}}</p>
    </div>
</template>

<script>
export default{
    name:'lyricList',
    data(){
        return{
            lyindex:0
        }
    },
    methods:{
        moveLyr(e){
            let my=e.clientY;
            let index=this.lyindex;
            let moveIndex;
            document.onmousemove=(e)=>{
                moveIndex=Math.round((e.clientY-my*1.5)/32);
                this.lyindex=index-moveIndex;
                this.$refs.lycb.scrollTo({top:(this.lyindex-3)*32,behavior:'smooth'});
            }
            document.onmouseup=()=>{
                this.$store.state.playTime=this.$store.state.lyric[this.lyindex].time;
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    },
    watch:{
        '$store.state.playTime'(playTime){
            this.$store.state.lyric.forEach((ly,index)=>{
                if(ly.time<=playTime+0.2){
                    this.lyindex=index;
                }
            })
            if(this.lyindex>3)
                this.$refs.lycb.scrollTo({top:(this.lyindex-3)*32,behavior:'smooth'});
        }
    }
}
</script>

<style scoped>
.lyric-box{
    width:354px;
    height:219px;
    margin:20px auto;
    line-height:32px;
    text-align:center;
    overflow:auto;
}
.lyric-box::-webkit-scrollbar{
    width:0;
}
.lyric{
    min-height:32px;
    color:#989898;
    user-select:none;
}
.lyric-time{
    color:#fff;
    font-size:14px;
}
</style>