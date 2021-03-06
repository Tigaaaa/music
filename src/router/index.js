import VueRouter from 'vue-router'

export default new VueRouter({
    routes:[
        {
            path:'',
            redirect:'/discover'
        },
        {
            path:'/discover',
            component:()=>import('../view/discover.vue'),
            children:[
                {
                    path:'',
                    redirect:'recommend'
                },
                {
                    path:'recommend',
                    component:()=>import('../view/recommendMusic')
                },
                {
                    path:'ranking',
                    component:()=>import('../view/rangkingList.vue')
                },
                {
                    path:'playlist',
                    component:()=>import('../view/playList.vue')
                },
                {
                    path:'/song',
                    component:()=>import('../view/songInformation.vue')
                },
                {
                    path:'/album',
                    component:()=>import('../view/albumInformation.vue')
                },
                {
                    path:'/detail',
                    component:()=>import('../view/detailInformation.vue')
                }
            ]
        },
        {
            path:'/myMusic',
            component:()=>import('../view/myMusic.vue')
        },
        {
            path:'/myFollow',
            component:()=>import('../view/myFollow.vue')
        },
        {
            path:'/theStore',
            component:()=>import('../view/theStore.vue')
        },
        {
            path:'/search',
            component:()=>import('../view/search.vue'),
            beforeEnter:(to,from,next)=>{
                if(to.query.keyword!="")
                next();
            }
        }
    ]
})