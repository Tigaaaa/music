<template>
    <div>
        <tabTop theTitle="评论" :more="false" />
        <div class="comments-warp">
            <div class="cmt-list">
                <aComment title="热门评论" :coms="hotcoms"/>
                <br><br>
                <aComment :title="'最新评论('+total+')'" :coms="coms"/>
            </div>
            <div>
                <bottomPage :offset="offset" :pageNum="Math.ceil(total/20)" @jump="jump" @addOffset="addOffset" @subOffset="subOffset"/>
            </div>
        </div>
    </div>
</template>

<script>
import {getSongCom,getAlbumCom,getDetailCom} from '@/utils/api.js'
import tabTop from './table-top.vue'
import aComment from './aComment.vue'
import bottomPage from './bottomPage.vue'

export default{
    name:'commentList',
    props:{
        id:{
            type:String,
            required:true
        },
        type:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            hotcoms:[],
            coms:[],
            total:0,
            offset:1,
        }
    },
    methods:{
        jump(offset){
            this.offset=offset;
        },
        addOffset(){
            this.offset++;
        },
        subOffset(){
            this.offset--;
        }
    },
    watch:{
        offset(newoffset){
            if(this.type==1){
                getSongCom(this.id,20,(newoffset-1)*20).then(res => {
                this.coms=res.data.comments;
                })
                .catch(err => {
                console.log(err)
                });
            }
            else if(this.type==2){
                getAlbumCom(this.id,20,(newoffset-1)*20).then(res => {
                this.coms=res.data.comments;
                })
                .catch(err => {
                console.log(err)
                });
            }
            else if(this.type==3){
                getDetailCom(this.id,20,(newoffset-1)*20).then(res => {
                this.coms=res.data.comments;
                })
                .catch(err => {
                console.log(err)
                });
            }
        }
    },
    created(){
        if(this.type==1){
            getSongCom(this.id,20,0).then(res => {
            this.hotcoms=res.data.hotComments;
            this.coms=res.data.comments;
            this.total=res.data.total;
            })
            .catch(err => {
            console.log(err)
            });
        }
        else if(this.type==2){
            getAlbumCom(this.id,20,0).then(res => {
            this.hotcoms=res.data.hotComments;
            this.coms=res.data.comments;
            this.total=res.data.total;
            })
            .catch(err => {
            console.log(err)
            });
        }
        else if(this.type==3){
            getDetailCom(this.id,20,0).then(res => {
                
                console.log(res.data);
            this.hotcoms=res.data.hotComments;
            this.coms=res.data.comments;
            this.total=res.data.total;
            })
            .catch(err => {
            console.log(err)
            });
        }
    },
    components:{
        tabTop,
        aComment,
        bottomPage
    }

}
</script>

<style scoped>
.comment-warp{
    margin-top:20px;
}

</style>