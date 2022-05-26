<template>
    <div class="bot">
        <a href="#" class="noon" @click="subOffset">上一页</a>

        <a href="#" class="noon" :class="{ison:offset==1}" @click="jump(1)">1</a>
        <span v-if="offset>=6">...</span>

        <a href="#" class="noon" :class="{ison:offset==num+n}"
        v-for="n in long" :key="n"
        @click="jump(num+n)">{{num+n}}</a>

        <span v-if="pageNum-offset>4">...</span>
        <a href="#" class="noon" :class="{ison:offset==pageNum}" 
        @click="jump(pageNum)">{{pageNum}}</a>

        <a href="#" class="noon" @click="addOffset">下一页</a>
    </div>
</template>

<script>

export default{
    name:'bottomPage',
    props:{
        offset:{
            type:Number,
            required:true
        },
        pageNum:{
            type:Number,
            required:true
        }
    },
    methods:{
        jump(offset){
            this.$emit('jump',offset);
        },
        addOffset(){
            this.$emit('addOffset');
        },
        subOffset(){
            this.$emit('subOffset');
        },
    },
    computed:{
        num(){
            if(this.offset>=1&&this.offset<=5)
                return 1;
            else if(this.pageNum-this.offset<=3)
                return this.pageNum-8;
            else 
                return this.offset-4; 
        },
        long(){
            if(this.pageNum>9)
                return 7;
            else
                return this.pageNum-2;
        }
    }
}
</script>

<style scoped>
.bot{
    margin: 20px 0;
    text-align: center;
}
.noon{
    height: 22px;
    display:inline-block;
    padding: 0 8px;
    background-color: #fff;
    line-height: 22px;
    margin: 0 1px 0 2px;
    border: 1px solid #ccc;
    border-radius: 2px;
    text-align:center;
}
.ison{
    background-color: #A2161B;
    color: #fff;
}
</style>