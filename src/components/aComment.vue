<template>
    <div>
        <h3 class="list-top">{{title}}</h3>
        <div class="com" v-for="com in coms" :key=com.commentId>
            <div class="hdimg"><img :src="com.user.avatarUrl"></div>
         <div class="content">
                <div class="top">
                    <a class="hov" href="#">{{com.user.nickname}}</a>
                    :{{com.content}}
                </div>
                <div class="bot">{{com.timeStr}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'aComment',
    props:{
        title:{
            type:String,
            required:true,
        },
        coms:{
            type:Array,
            required:true,
        }
    },
}
</script>

<style scoped>
.list-top{
    position: relative;
    top: 1px;
    height: 20px;
    border-bottom: 1px solid #cfcfcf
}
.com{
    padding:15px 0;
    border-top: 1px dotted #ccc;
}
.hdimg, .hdimg img{
    width:50px;
    height:50px;
    float:left;
}
.content{
    margin-left:60px;
}
a{
   color: #0c73c2;
}
.bot{
    margin-top:15px;
    color:#999;
}
</style>