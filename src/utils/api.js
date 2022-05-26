import axios from "./request";

export const getBanner=()=>axios.get('/banner');//轮播图

export const getHotList=()=>axios.get('/top/playlist?limit=8');//热门推荐

export const getNewList=(limit,offset)=>axios.get('/top/album?offset='+offset+'&limit='+limit);//新碟上架

export const getSelect=(keyword,type,limit)=>axios.get('/search?keywords='+keyword+'&type='+type+'&limit='+limit);

export const getSongUrl=(id)=>axios.get('/song/url?id='+id);//获取音乐url

export const getSongInf=(id)=>axios.get('/song/detail?ids='+id);//获取歌曲信息

export const getSongLy=(id)=>axios.get('/lyric?id='+id);//获取音乐歌词

export const getSongCom=(id,limit,offset)=>axios.get('/comment/music?id='+id+'&limit='+limit+'&offset='+offset);//获取歌曲评论

export const getAlbum=(id)=>axios.get('/album?id='+id);//获取专辑内容

export const getAlbumCom=(id,limit,offset)=>axios.get('/comment/album?id='+id+'&limit='+limit+'&offset='+offset);//专辑评论

export const getTopList=()=>axios.get('/toplist');//所有榜单

export const getDetail=(id)=>axios.get('/playlist/detail?id='+id);//歌单内容

export const getDetailCom=(id,limit,offset)=>axios.get('/comment/playlist?id='+id+'&limit='+limit+'&offset='+offset);//歌单评论

export const getCaptcha=(phone)=>axios.get('/captcha/sent?phone='+phone);//发送验证码

export const sentCaptcha=(phone,captcha)=>axios.get('/captcha/verify?phone='+phone+'&captcha='+captcha);//验证验证码

export const getUser=()=>axios.get('/user/account');//获取账号信息