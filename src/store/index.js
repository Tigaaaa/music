import Vuex from 'vuex'
import Vue from 'vue'
import {shuffle} from '@/components/founc.js'

Vue.use(Vuex)

const actions={
    play(context,songInf){
        context.commit('Play',songInf)
    },
    playAlbum(context,songs){
        context.commit('PlayAlbum',songs)
    },
    pre(context){
        context.commit('Pre')
    },
    next(context){
        context.commit('Next')
    },
    changStyle(context){
        context.commit('ChangeStyle')
    }
}

const mutations={
    Play(state,songInf){
        state.isplay=true;
        if(state.index==-1){
            state.showList.push(songInf);
            state.playList.push(songInf);
            state.index++;
        }
        else{
            let rep=-1;
            for(let i in state.showList){
                if(state.showList[i].id==songInf.id){
                    rep=i;
                    break;
                }
            }
            if(state.isAlbum==0){
                if(rep!=-1){
                    state.showList.splice(rep,1);
                    if(rep<=state.index)
                        state.index--;
                }
                state.showList.splice(state.index+1,0,songInf);
                state.index++;
            }
            else{
                if(rep!=-1)
                    state.index=rep;
                else{
                    state.showList.splice(state.index+1,0,songInf);
                    state.index++;
                }
            }

            if(state.playStyle==2)
                state.playList=shuffle(state.showList,state.index);
            else
                state.playList=state.showList;
        }
    },
    PlayAlbum(state,songs){
        state.isAlbum=1;
        state.isplay=true;
        state.showList=songs;
        if(state.playStyle==2)
            state.playList=shuffle(state.showList,state.index);
        else
            state.playList=state.showList;
        state.index=0;   
    },
    Pre(){
        state.index--;
        state.index=(state.index+state.playList.length)%state.playList.length;
    },
    Next(){
        state.index++;
        state.index=state.index%state.playList.length;
    },
    ChangeStyle(){
      state.playStyle=++state.playStyle%3;
      if(state.playStyle==2){
          state.playList=shuffle(state.playList,state.index);
      }
      else if(state.playStyle==0){
          state.playList=state.showList;
      }
    }
}

const state={
    playList:[],
    showList:[],
    index:-1,
    isplay:false,
    playTime:0,

    listShow:false,
    lyric:[],

    playStyle:0,
    isAlbum:0
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})